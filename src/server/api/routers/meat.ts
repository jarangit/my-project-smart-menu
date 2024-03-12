import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const meatRouter = createTRPCRouter({
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

      const data = await ctx.db.meat.findUnique({
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
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
      const restaurant = await ctx.db.restaurant.findUnique({
        where: {
          ownerId: userId,
        },
      });
      const createMeat = await ctx.db.meat.create({
        data: {
          ...input,
          restaurantId: restaurant?.id,
        },
      });

      if (createMeat) {
        await ctx.db.restaurant.update({
          where: {
            id: restaurant?.id,
          },
          data: {
            meats: {
              connect: { id: createMeat.id },
            },
          },
        });
      }

      return createMeat;
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
      const updateRes = await ctx.db.restaurant.update({
        where: {
          ownerId: userId,
        },
        data: {
          meats: {
            create: input.items,
          },
        },
        include: {
          meats: true,
        },
      });

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
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }

      const update = await ctx.db.meat.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
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

      const data = await ctx.db.meat.findMany({
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
      const deleted = await ctx.db.meat.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),
});
