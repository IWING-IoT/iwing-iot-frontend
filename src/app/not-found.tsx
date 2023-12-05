import { NotFound404Illustration } from "@/components/atoms/illustrations/notfound-404-illustration";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen">
      <EmptyState>
        <EmptyStateImage>
          <NotFound404Illustration />
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
  );
}
