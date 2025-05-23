import "@uploadthing/react/styles.css";
import TopNav from "~/app/_components/topnav"; 
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist }         from "next/font/google";

import { NextSSRPlugin }      from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter }       from "./api/uploadthing/core";
import { Toaster } from "sonner";
import { CSPostHogProvider } from "~/app/_analytics/providers";

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
      <CSPostHogProvider>
      <html lang="en">
        <NextSSRPlugin 
          routerConfig = {extractRouterConfig(ourFileRouter)}
        />
        <body className="font-sans ${inter.variable} dark">
          
          <div className = "grid h-screen grid-rows-[auto_1fr]">
            <TopNav />
            <main className = "overflow-y-scroll">{children}</main>
          </div>
          {modal}
          <div id = "modal-root" />
          <Toaster />
        </body>
      </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}