import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <ClerkProvider>
      <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
