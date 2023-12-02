import { ReactNode } from "react";
import NavContent from "@/components/organisms/nav-content";
import TopBar from "@/components/organisms/top-bar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      {/* Mobile top bar */}
      <TopBar />
      <div className="flex xl:h-screen">
        {/* Sidebar */}
        <nav className="hidden w-72 border-r pb-6 pt-8 xl:flex">
          <NavContent />
        </nav>
        {/* Content */}
        <div className="flex flex-1 flex-col overflow-x-hidden xl:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
