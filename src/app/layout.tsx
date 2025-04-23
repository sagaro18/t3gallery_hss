import "@uploadthing/react/styles.css";
import TopNav from "~/app/_components/topnav"; 
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist }         from "next/font/google";

import { NextSSRPlugin }      from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter }       from "./api/uploadthing/core";

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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <NextSSRPlugin 
          routerConfig = {extractRouterConfig(ourFileRouter)}
        />
        <body className="font-sans bg-black text-white">
          <TopNav />
          {children}
          {modal}
          <div id = "modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}