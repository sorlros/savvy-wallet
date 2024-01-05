import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

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
      <QueryProvider>
        <ModalProvider />
        <body className={inter.className}>{children}</body>
      </QueryProvider>
    </html>
  );
}
