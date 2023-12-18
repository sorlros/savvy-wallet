import { Sidebar } from "@/app/(entrance)/(_component)/sidebar";
import { PropsWithChildren } from "react";

const MybookLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-[100vh] overflow-y-hidden">
      <Sidebar />
      {children}
    </div>
  );
};

export default MybookLayout;
