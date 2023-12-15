import Link from "next/link";
import { Logo } from "../../../components/logo";
import { Button } from "../../../components/ui/button";

export const Header = async () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center gap-x-4">
          <Button variant="outline" asChild>
            <Link href="/sign-in">로그인</Link>
          </Button>
          <Button variant="destructive" asChild>
            <Link href="/sign-up">회원가입</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
