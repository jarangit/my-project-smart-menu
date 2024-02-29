import { createTRPCRouter } from "~/server/api/trpc";
import { restaurantRouter } from "./routers/restaurant";
import { s3Router } from "./routers/s3-upload";
import { imageStoresRouter } from "./routers/image-stores";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
  s3: s3Router,
  imageStores: imageStoresRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
