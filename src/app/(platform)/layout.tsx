import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
    {children}
    </>
  );
};

export default ContentLayout;
