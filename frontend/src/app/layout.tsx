"use client";

import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="flex justify-between min-h-[1280px] p-6">
          <Sidebar />
          <main className="min-w-[900px] flex flex-col space-y-8 mx-8 px-6 py-3">
            {children}
          </main>
          <Feed />
        </div>
      </body>
    </html>
  );
}
