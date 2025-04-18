"use client";
import { Sign } from "crypto";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";

export default function TopNav() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>Gallery</div>
      <div className = "flex flex-row">
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton endpoint={"imageUploader"} className="bg-blue-500 text-white px-4 py-2 rounded mr-4" />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
