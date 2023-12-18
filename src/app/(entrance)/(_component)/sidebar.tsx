"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Sidebar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const onClick = () => {
    setToggleMenu(!toggleMenu);
    console.log(toggleMenu);
  };

  return (
    <aside
      className={cn(
        "flex flex-col relative top-14 h-[100vh]  bg-neutral-200 transition-all ease-in-out duration-300",
        toggleMenu ? "w-[250px]" : "w-[0px]",
      )}
    >
      <div
        onClick={onClick}
        className="flex items-center justify-center h-full absolute left-[100%]"
        role="button"
      >
        {toggleMenu ? (
          <ArrowLeft className="relative w-6 h-6 right-0 -top-14 text-white bg-neutral-200" />
        ) : (
          <ArrowRight className="relative w-6 h-6 right-0 -top-14 text-black bg-neutral-200" />
        )}
      </div>
    </aside>
  );
};
