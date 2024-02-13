import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

import { ModalProvider } from "@/provider/modal-provider";
import { QueryProvider } from "@/provider/query-provider";
import ClientOnly from "@/components/client-only";
import { CalendarProvider } from "./context/calendar-context";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Account book",
  description: "Account book web with Next.js",
  icons: [
    {
      url: "../../../logo.svg",
      href: "../../../logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <CalendarProvider>
        <Toaster />
        <ModalProvider />
        <body className={inter.className}>{children}</body>
      </CalendarProvider>
    </html>
  );
}
