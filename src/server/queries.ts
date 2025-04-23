import "server-only";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";

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