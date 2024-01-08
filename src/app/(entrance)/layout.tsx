import { Footer } from "@/app/(entrance)/(_component)/footer";
import { Header } from "@/app/(entrance)/(_component)/header";

import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Navbar } from "./(content)/mybook/[userId]/_component/navbar";

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
  // const currentUser = getCurrentUser();
  // console.log(currentUser);

  return (
    <div className="flex w-full h-[100vh] bg-slate-100 overflow-y-hidden">
      {/* {currentUser !== null ? <Navbar /> : <Header />} */}

      <main className="flex w-full h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default EntranceLayout;
