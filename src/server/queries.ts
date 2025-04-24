import "server-only";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { posts } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
  const { userId } = await auth(); // Destructure userId directly
  if (!userId) throw new Error("Unauthorized"); // Ensure the user is authenticated
  const images = await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.userId, userId), // Use userId
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
    const { userId } = await auth(); 
    if (!userId) throw new Error("Unauthorized");
    const image = await db.query.posts.findFirst({
      where: (model, { eq }) => eq(model.id, id),
    });
  
    if (!image) throw new Error("Image not found");
    if (image.userId !== userId) throw new Error("Unauthorized");
    return image;
  }

export async function deleteImage(id: number) {
  const { userId } = await auth(); 
  if (!userId) throw new Error("Unauthorized");
  await db.delete(posts).where(and(eq(posts.id, id), eq(posts.userId, userId)));
  analyticsServerClient.capture({
    distinctId: userId,
    event: "Image Deleted",
    properties: {
      imageId: id,
  }
  });
  redirect("/"); // Redirect to the home page
}