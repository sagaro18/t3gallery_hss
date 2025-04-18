import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError }      from "uploadthing/server";
import { auth }                  from "@clerk/nextjs/server";
import { db }                    from "~/server/db";
import { posts }                 from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    // Either use the shorthand... 
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    // ...or explicitly list MIME types instead:
    // "image/png":  { maxFileSize: "4MB", maxFileCount: 1 },
    // "image/jpeg": { maxFileSize: "4MB", maxFileCount: 1 },
  })
  .middleware<{ userId: string }>(async () => {
    const { userId } = await auth();
    console.log("🔑 Clerk userId:", userId);
    if (!userId) throw new UploadThingError("Unauthorized");
    return { userId };
  })
  .onUploadComplete(async ({ metadata, file }) => {
    console.log("🪄 File object:", file);
    try {
      await db.insert(posts).values({
        name: file.name,
        url:  file.url,
      });
      console.log("✅ Row inserted");
    } catch (err) {
      console.error("❌ DB insert failed:", err);
      throw new UploadThingError("Database insert failed");
    }
    return { uploadedBy: metadata.userId };
  }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
