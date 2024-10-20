'use client'
import Nav from "@/components/Nav";
import "./globals.css";
import { SessionProvider } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[#313338]`}
      >
        <SessionProvider>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
