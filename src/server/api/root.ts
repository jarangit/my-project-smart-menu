import { createTRPCRouter } from "~/server/api/trpc";
import { restaurantRouter } from "./routers/restaurant";
import { s3Router } from "./routers/s3-upload";
import { imageStoresRouter } from "./routers/image-stores";
import { menuRouter } from "./routers/menu";
import { categoryRouter } from "./routers/category";
import { toppingRouter } from "./routers/topping";
import { meatRouter } from "./routers/meat";
import { categoryStoreRouter } from "./routers/admin-system/category-store";
import { meatStoreRouter } from "./routers/admin-system/meat-store";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
  s3: s3Router,
  imageStores: imageStoresRouter,
  menu: menuRouter,
  category: categoryRouter,
  topping: toppingRouter,
  meat: meatRouter,
  categoryStore: categoryStoreRouter,
  meatStore: meatStoreRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
