import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-9 bg-neutral-800">
      <div className="flex items-center justify-between md:justify-end w-full h-full">
        <Button variant="ghost" className="text-white">
          Privacy Policy
        </Button>
        <Button variant="ghost" className="text-white">
          Terms of Service
        </Button>
      </div>
    </div>
  );
};
