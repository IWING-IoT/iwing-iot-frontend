import { Logo } from "../atoms/logo";
import { HamburgerBar } from "./hamburger-bar";
import NavContent from "./nav-content";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-10 flex gap-4 border-b bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:hidden">
      <HamburgerBar>
        <NavContent />
      </HamburgerBar>
      <Logo />
    </div>
  );
}
