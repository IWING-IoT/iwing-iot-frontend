import { ModeToggle } from "@/components/molecules/mode-toggle";
import HamburgerBar from "./hamburger-bar";
import Logo from "@/components/atoms/logo";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 flex justify-between border-b bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:hidden">
      <div className="flex gap-4">
        <HamburgerBar />
        <Logo />
      </div>
      <ModeToggle />
    </div>
  );
}
