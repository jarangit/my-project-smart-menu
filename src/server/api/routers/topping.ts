import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toppingRouter = createTRPCRouter({
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

      const data = await ctx.db.topping.findUnique({
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
        imageUrl: z.string(),
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
      const createTopping = await ctx.db.topping.create({
        data: {
          ...input,
          restaurantId: restaurant?.id,
        },
      });

      if (createTopping) {
        await ctx.db.restaurant.update({
          where: {
            id: restaurant?.id,
          },
          data: {
            toppings: {
              connect: { id: createTopping.id },
            },
          },
        });
      }

      return createTopping;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        imageUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("payload", input);
      const { name } = input;
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
     
      const update = await ctx.db.topping.update({
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

      const data = await ctx.db.topping.findMany({
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
      const deleted = await ctx.db.topping.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),
});
