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
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.url}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
              alt={image.name || "Display image"}
            />
          </Link>
          <div>{image.name}</div>
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