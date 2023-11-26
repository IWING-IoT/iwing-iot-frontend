import HamburgerBar from "./hamburger-bar";
import Logo from "@/components/atoms/logo";
import NavContent from "./nav-content";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-50 flex gap-4 border-b bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:hidden">
      <HamburgerBar>
        <NavContent />
      </HamburgerBar>
      <Logo />
    </div>
  );
}