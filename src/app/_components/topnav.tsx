import { Sign } from "crypto";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>Gallery</div>
      <div>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
