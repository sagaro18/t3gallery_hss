import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export default function TopNav() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>Gallery</div>
      <div className = "flex flex-row gap-4 items-center">
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
