import { signOut } from "@/auth";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Navbar = async () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center gap-x-4">
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
