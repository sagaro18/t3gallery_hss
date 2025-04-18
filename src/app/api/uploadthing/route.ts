export const runtime = "nodejs";
console.log("🛠️ UPLOADTHING_APP_ID:", process.env.UPLOADTHING_APP_ID);
console.log("🛠️ UPLOADTHING_SECRET:", process.env.UPLOADTHING_SECRET);

import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    isDev: process.env.NODE_ENV === "development",
  },
  // Apply an (optional) custom config:
  // config: { ... },
});