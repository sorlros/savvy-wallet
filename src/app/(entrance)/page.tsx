import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "../../lib/utils";
import { Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const EntrancePage = () => {
  return (
    <div className="flex bg-slate-100 flex-col items-center justify-center pt-40 pb-20">
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          headingFont.className,
        )}
      >
        <div className="flex border rounded-full shadow-sm text-sky-900 bg-amber-100 uppercase p-4">
          <Gem className="w-6 h-6 mr-2" />
          No.1 가계부 웹 어플리케이션
        </div>
        <h1 className="mt-4 mb-6 text-xl font-bold md:text-6xl text-center text-neutral-800">
          SavvyWallet 을 사용한다면 ?
        </h1>

        <div className="flex-row gap-x-2 w-full px-3 md:flex">
          <div className="text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit mb-3">
            예산 관리
          </div>
          <div className="text-3xl md:text-5xl bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white px-4 p-2 rounded-md pb-4 w-fit mb-3">
            간단한 사용
          </div>
          <div className="text-3xl md:text-5xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit mb-3">
            실시간 업데이트
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mt-5 text-sm text-center md:text-xl text-neutral-400 max-w-xs md:max-w-3xl px-3",
          textFont.className,
        )}
      >
        우리의 가계부 웹페이지는 개인과 가족이 손쉽게 자신의 재무를 추적하고
        관리할 수 있도록 돕는 효율적이고 간편한 도구입니다. 간단한 사용자 경험과
        직관적인 디자인으로 여러분의 재무 상황을 효과적으로 파악하고 관리할 수
        있습니다.
      </div>

      <Button asChild className="mt-6" size="lg">
        <Link href="/sign-up">지금 바로 사용하기</Link>
      </Button>
    </div>
  );
};

export default EntrancePage;
