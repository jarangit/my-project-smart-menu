/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

import bcrypt from 'bcrypt';



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
      }
    })
    return res
  }),
  create: publicProcedure.input(
    z.object({
      name: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id
    const foundUser = await ctx.db.user.findUnique({
      where: {
        id: userId
      }
    })
    console.log(foundUser)
    if (foundUser) {
      const restaurant = await ctx.db.restaurant.create({
        data: {
          name: input.name,
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

});
