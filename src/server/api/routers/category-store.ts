import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryStoreRouter = createTRPCRouter({
  getAll: publicProcedure.input({}).query(async ({ ctx }) => {
    console.log("get data");
    const data = await ctx.db.categoryStore.findMany({});
    return ["hi"];
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(
        "%cMyProject%cline:15%cinput",
        "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
        "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
        "color:#fff;background:rgb(20, 68, 106);padding:3px;border-radius:2px",
        input,
      );
      console.log("create cat");
      // const created = await ctx.db.categoryStore.create({
      //   data: {
      //     ...input,
      //   },
      // });
      // return created;
      return;
    }),
});
