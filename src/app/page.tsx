import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images(){
  const images = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  }); // Fetch images from the database
  return (      
  <div className="flex flex-wrap gap-4">
    {images.map((image, index) => (
      <div key={`${image.id}-${index}`} className="w-48 text-center">
        <img
          src={image.url || "/placeholder.jpg"} // Use a placeholder if `image.url` is undefined
          alt={image.name || "Image"} // Use `image.name` or a default alt text
          className="w-full h-auto"
        />
        <p className="mt-2 text-sm text-white">{image.name || "Unnamed"}</p> {/* Display name */}
      </div>
    ))}
    </div>
  );
}

export default async function HomePage() {


  return (
    <main className="p-4">
      <SignedOut>
        <div className = "h-full w-full text-2x1 text-center"> Please sign in </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
      <p className="text-center mt-4">Hello (gallery in progress)</p>
    </main>
  );
}