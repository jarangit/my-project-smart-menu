import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }

      const data = await ctx.db.category.findUnique({
        where: {
          id: input.id,
        },
      });

      return data;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
      const restaurant = await ctx.db.restaurant.findUnique({
        where: {
          ownerId: userId,
        },
      });
      const createCategory = await ctx.db.category.create({
        data: {
          ...input,
          restaurantId: restaurant?.id,
        },
      });

      if (createCategory) {
        await ctx.db.restaurant.update({
          where: {
            id: restaurant?.id,
          },
          data: {
            categories: {
              connect: { id: createCategory.id },
            },
          },
        });
      }

      return createCategory;
    }),
  createMany: publicProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            name: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
      const restaurant = await ctx.db.restaurant.findUnique({
        where: {
          ownerId: userId,
        },
      });
      const updateRes = await ctx.db.restaurant.update({
        where: {
          ownerId: userId,
        },
        data: {
          categories: {
            create: input.items,
          },
        },
        include: {
          categories: true,
        },
      });
      // const createCategory = await ctx.db.category.createMany({
      //   data: input.items,
      // });

      // if (createCategory) {
      //   await ctx.db.restaurant.update({
      //     where: {
      //       id: restaurant?.id,
      //     },
      //     data: {
      //       categories: {
      //         connect: { id: createCategory.id },
      //       },
      //     },
      //   });
      // }

      return updateRes;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("payload", input);
      const { name } = input;
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
      const restaurant = await ctx.db.restaurant.findUnique({
        where: {
          ownerId: userId,
        },
      });
      const update = await ctx.db.category.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          restaurantId: restaurant?.id,
        },
      });

      return update;
    }),
  getAllByRestaurantId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const { id } = input;
      if (!userId) {
        return;
      }

      const data = await ctx.db.category.findMany({
        where: {
          restaurantId: id,
        },
        include: {
          menus: true,
        },
      });

      return data;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
      const deleted = await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),
});
