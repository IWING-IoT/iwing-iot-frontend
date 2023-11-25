import { ReactNode } from "react";
import NavContent from "@/components/organisms/nav-content";
import TopBar from "@/components/organisms/top-bar";
import HamburgerBar from "@/components/organisms/hamburger-bar";
import Logo from "@/components/atoms/logo";
import { ModeToggle } from "@/components/molecules/mode-toggle";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex xl:h-screen">
      {/* Sidebar */}
      <nav className="hidden w-72 border-r pb-6 pt-8 xl:flex">
        <NavContent />
      </nav>
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-50 flex justify-between border-b bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:hidden">
          <div className="flex gap-4">
            <HamburgerBar>
              <NavContent />
            </HamburgerBar>
            <Logo />
          </div>
          <ModeToggle />
        </div>
        <div className="max-w-screen flex flex-1 flex-col xl:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
