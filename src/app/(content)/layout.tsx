import { Wrapper } from "@/components/providers/wrapper";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      {/* <Wrapper /> */}
      {children}
    </ClerkProvider>
  );
};

export default ContentLayout;
