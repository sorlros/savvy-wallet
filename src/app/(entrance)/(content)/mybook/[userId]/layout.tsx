import { Sidebar } from "@/app/(entrance)/(_component)/sidebar";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

const MybookLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full h-[100vh]">
      <Toaster />
      <Sidebar />
      {children}
    </div>
  );
};

export default MybookLayout;
