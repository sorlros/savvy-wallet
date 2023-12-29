import { Sidebar } from "@/app/(entrance)/(_component)/sidebar";
import { PropsWithChildren } from "react";

const MybookLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full h-[100vh]">
      <Sidebar />
      {children}
    </div>
  );
};

export default MybookLayout;
