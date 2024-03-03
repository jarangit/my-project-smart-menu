/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";




export const restaurantRouter = createTRPCRouter({
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   console.log('get all users')
  //   return ''
  // }),
  // getOne: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ input, ctx }) => {
  //     return ctx.db.user.findUnique({
  //       where: {
  //         id: input.id
  //       },
  //     });
  //   }),
  getOne: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(async ({ ctx, input }) => {
    const res = await ctx.db.restaurant.findUnique({
      where: {
        ownerId: input.id
      },
      include: {
        menus: true
      }
    })
    return res
  }),
  create: publicProcedure.input(
    z.object({
      name: z.string(),
      profileImageUrl: z.string(),
      coverImage: z.string(),
      facebook: z.string(),
      lineId: z.string(),
      googleMapUrl: z.string(),
      phone: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id
    const { name, profileImageUrl, facebook, lineId, googleMapUrl, phone, coverImage } = input
    const foundUser = await ctx.db.user.findUnique({
      where: {
        id: userId
      }
    })
    console.log(foundUser)
    if (foundUser) {
      const restaurant = await ctx.db.restaurant.create({
        data: {
          name,
          profileImageUrl,
          coverImage,
          facebook,
          lineId,
          googleMapUrl,
          phone,
          ownerId: foundUser.id
        }
      })

      if (restaurant) {
        await ctx.db.user.update({
          where: {
            id: foundUser.id
          },
          data: {
            restaurant: {
              connect: { id: restaurant.id }
            }
          }
        })
      }
      return restaurant
    }
  }),
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      profileImageUrl: z.string(),
      coverImage: z.string(),
      facebook: z.string(),
      lineId: z.string(),
      googleMapUrl: z.string(),
      phone: z.string(),
    })).mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id
      const findRestaurant = await ctx.db.restaurant.findUnique({
        where: {
          id: input.id
        }
      })
      if (!userId || userId != findRestaurant?.ownerId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Update data error ',
          cause: '',
        });
      }

      const updated = await ctx.db.restaurant.update({
        where: {
          id: input.id
        },
        data: {
          ...input
        }
      })
      return updated

    }),
  delete: publicProcedure
    .input((z.object({
      id: z.string(),
    }))).mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id
      const findRestaurant = await ctx.db.restaurant.findUnique({
        where: {
          id: input.id
        },
        include: {
          menus: true
        }
      })
      if (!userId || userId != findRestaurant?.ownerId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Update data error ',
          cause: '',
        });
      }

      const deleted = await ctx.db.restaurant.delete({
        where: {
          id: input.id
        }
      })

      for (const menuItem of findRestaurant.menus) {
        await ctx.db.menu.delete({
          where: {
            id: menuItem.id,
          }
        })
      }

      return deleted
    })

});
