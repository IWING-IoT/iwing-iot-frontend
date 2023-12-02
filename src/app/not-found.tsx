import NotFoundIllustration from "@/components/atoms/illustrations/not-found-illustration";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import NavContent from "@/components/organisms/nav-content";
import TopBar from "@/components/organisms/top-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
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
        <div className="flex flex-1 flex-col xl:overflow-y-auto">
          <EmptyState>
            <EmptyStateImage>
              <NotFoundIllustration />
            </EmptyStateImage>
            <EmptyStateTextContent>
              <EmptyStateTitle>
                The page you're looking for doesn't exist.
              </EmptyStateTitle>
              <EmptyStateDescription>
                Don't worry! Let's go back home.
              </EmptyStateDescription>
            </EmptyStateTextContent>
            <EmptyStateAction>
              <Button asChild>
                <Link href="/home?sortBy=ascending">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back home
                </Link>
              </Button>
            </EmptyStateAction>
          </EmptyState>
        </div>
      </div>
    </div>
  );
}
