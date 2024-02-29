/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/*@typescript-eslint/no-explicit-any */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { env } from "~/env";

export const imageStoresRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id
    if (userId) {
      const data = await ctx.db.imageStores.findMany()
      const mapData = data.map((item: any) => {
        return {
          ...item,
          url: !item.url.startsWith('https://') ? `/${item.url}` : item.url,
        }
      })
      return mapData
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        key: z.string(),
        url: z.string(),
        type: z.string(),
      })
    ).mutation(async ({ ctx, input }) => {
      const imageStore = await ctx.db.imageStores.create({
        data: {
          key: input.key as '',
          url: `${env.DOMAIN_IMAGE_AWS}/${input.url}` as '',
          type: input.type as ''
        }
      })
      return imageStore
    })
})
