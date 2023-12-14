import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const path = require("path");

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center hidden md:flex gap-x-3">
        <Image src="/logo.svg" alt="Logo" width={35} height={35} />
        <p className={cn("text-lg text-neutral-600", headingFont.className)}>
          NAME
        </p>
      </div>
    </Link>
  );
};
