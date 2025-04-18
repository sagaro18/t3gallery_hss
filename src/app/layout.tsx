import "@uploadthing/react/styles.css";
import TopNav from "~/app/_components/topnav"; 
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "T3 Gallery",
  description: "Simple intern making a simple gallery",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-sans bg-black text-white">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}