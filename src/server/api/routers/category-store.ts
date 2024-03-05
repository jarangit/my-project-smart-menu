import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryStoreRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.categoryStore.findMany();
    return data;
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const created = await ctx.db.categoryStore.create({
        data: {
          ...input,
        },
      });
      return created;
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.db.categoryStore.delete({
        where: {
          id: input.id,
        },
      });
      return deleted;
    }),
});
