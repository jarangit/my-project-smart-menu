/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

export const restaurantRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.restaurant.findUnique({
        where: {
          ownerId: input.id,
        },
        include: {
          menus: true,
          categories: true,
          toppings: true,
          meats: true,
        },
      });
      return res;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        profileImageName: z.string().optional(),
        coverImageName: z.string().optional(),
        facebookUrl: z.string().optional(),
        lineId: z.string().optional(),
        googleMapUrl: z.string().optional(),
        phone: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const {
        name,
        profileImageName,
        facebookUrl,
        lineId,
        googleMapUrl,
        phone,
        coverImageName,
      } = input;
      const foundUser = await ctx.db.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (foundUser) {
        const restaurant = await ctx.db.restaurant.create({
          data: {
            name,
            profileImageUrl:`${env.DOMAIN_IMAGE_AWS}/${profileImageName}`,
            coverImageUrl:`${env.DOMAIN_IMAGE_AWS}/${coverImageName}`,
            facebookUrl,
            lineId,
            googleMapUrl,
            phone,
            ownerId: foundUser.id,
          },
        });

        if (restaurant) {
          await ctx.db.user.update({
            where: {
              id: foundUser.id,
            },
            data: {
              restaurant: {
                connect: { id: restaurant.id },
              },
            },
          });
        }
        return restaurant;
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        profileImageUrl: z.string(),
        coverImage: z.string(),
        facebookUrl: z.string(),
        lineId: z.string(),
        googleMapUrl: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const findRestaurant = await ctx.db.restaurant.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!userId || userId != findRestaurant?.ownerId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Update data error ",
          cause: "",
        });
      }

      const updated = await ctx.db.restaurant.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return updated;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const findRestaurant = await ctx.db.restaurant.findUnique({
        where: {
          id: input.id,
        },
        include: {
          menus: true,
          categories: true,
          toppings: true,
          meats: true,
        },
      });
      if (!userId || userId != findRestaurant?.ownerId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Update data error ",
          cause: "",
        });
      }
      await ctx.db.menu.deleteMany({
        where: {
          restaurantId: input.id,
        },
      });
      await ctx.db.category.deleteMany({
        where: {
          restaurantId: input.id,
        },
      });
      await ctx.db.topping.deleteMany({
        where: {
          restaurantId: input.id,
        },
      });
      await ctx.db.meat.deleteMany({
        where: {
          restaurantId: input.id,
        },
      });
      const deleted = await ctx.db.restaurant.deleteMany({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),
 
});
