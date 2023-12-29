import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/provider/modal-provider";
import { QueryProvider } from "@/provider/query-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <ClerkProvider>
        <QueryProvider>
          <ModalProvider />
          <body className={inter.className}>{children}</body>
        </QueryProvider>
      </ClerkProvider>
    </html>
  );
}
