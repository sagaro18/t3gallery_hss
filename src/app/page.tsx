import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link.js";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-48 h-48 flex-shrink-0 flex flex-col"
        >
          <Link href={`/img/${image.id}`}>
            <div className="relative w-full h-48">
              <Image
                src={image.url}
                alt={image.name ?? "Image"}
                fill                    // fill the parent div
                style={{ objectFit: "contain" }}
                unoptimized             // skip Next’s image loader if you prefer
              />
            </div>
          </Link>
          <div className="truncate text-sm text-center">{image.name}</div>
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