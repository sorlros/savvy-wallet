import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

const EntranceLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full bg-slate-100">
      <Header />
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default EntranceLayout;
