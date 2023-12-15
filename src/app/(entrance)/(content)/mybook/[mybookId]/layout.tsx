import { Sidebar } from "@/app/(entrance)/(_component)/sidebar";
import { PropsWithChildren } from "react";
import { Navbar } from "./_component/navbar";

const MybookLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default MybookLayout;
