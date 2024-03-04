import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import category from "~/pages/restaurant/category";
import { connect } from "http2";

export const menuRouter = createTRPCRouter({
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

      const data = await ctx.db.menu.findUnique({
        where: {
          id: input.id,
        },
        include: {
          category: true,
        },
      });

      return data;
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        imageUrl: z.string(),
     
        price: z.number(),
        discount: z.number(),
        detail: z.string(),
        isSell: z.boolean(),
        isPromotion: z.boolean(),
        isHot: z.boolean(),
        isNews: z.boolean(),
        isDiscount: z.boolean(),
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
      const createMenu = await ctx.db.menu.create({
        data: {
          ...input,
          restaurantId: restaurant?.id,
          toppingOptions: {
            create: [
              {
                name: "Whipped",
                price: 5,
              },
            ],
          },
          meatOptions: {
            create: [
              {
                name: "Chicken",
              },
            ],
          },
        },
      });

      if (createMenu) {
        await ctx.db.restaurant.update({
          where: {
            id: restaurant?.id,
          },
          data: {
            menus: {
              connect: { id: createMenu.id },
            },
          },
        });
      }

      return createMenu;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        categoryId: z.number().optional(),
        toppingOptions: z
          .array(
            z.object({
              id: z.number(),
            }),
          )
          .optional(),
        meatOptions: z
          .array(
            z.object({
              id: z.number(),
            }),
          )
          .optional(),
        imageUrl: z.string(),
        price: z.number(),
        discount: z.number(),
        detail: z.string(),
        isSell: z.boolean(),
        isPromotion: z.boolean(),
        isHot: z.boolean(),
        isNews: z.boolean(),
        isDiscount: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("payload", input);
      const {
        name,
        price,
        discount,
        detail,
        isSell,
        isDiscount,
        isHot,
        isNews,
        isPromotion,
        imageUrl,
      } = input;
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
      const restaurant = await ctx.db.restaurant.findUnique({
        where: {
          ownerId: userId,
        },
      });
      const update = await ctx.db.menu.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          restaurantId: restaurant?.id,
          categoryId: input.categoryId,
          toppingOptions: {
            set: input.toppingOptions,
          },
          meatOptions: {
            set: input.meatOptions,
          },
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

      const data = await ctx.db.menu.findMany({
        where: {
          restaurantId: id,
        },
        include: {
          category: true,
          toppingOptions: true,
        },
      });

      return data;
    }),
  delete: publicProcedure
    .input(
      z.object({
        menuId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        return;
      }
      const deleted = await ctx.db.menu.delete({
        where: {
          id: input.menuId,
        },
      });
      return deleted;
    }),
});
