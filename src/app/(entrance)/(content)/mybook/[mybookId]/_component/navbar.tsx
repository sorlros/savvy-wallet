import { Logo } from "@/components/logo";
import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center gap-x-4">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
