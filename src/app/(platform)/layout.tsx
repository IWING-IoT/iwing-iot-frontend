import { ReactNode } from "react";
import NavContent from "../../components/organisms/nav-content";
import NavBar from "../../components/organisms/navbar";

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
        <NavBar />
        <div className="max-w-screen flex flex-1 flex-col xl:overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
