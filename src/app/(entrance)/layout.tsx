import { Footer } from "@/app/(entrance)/(_component)/footer";
import { Header } from "@/app/(entrance)/(_component)/header";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Navbar } from "./(content)/mybook/[mybookId]/_component/navbar";

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

const EntranceLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = await auth();

  return (
    <div className="flex w-full h-[100vh] bg-slate-100 overflow-y-hidden">
      {userId !== null ? <Navbar /> : <Header />}

      <main className="flex w-full h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default EntranceLayout;
