import { NotFound404Illustration } from "@/components/atoms/illustrations/notfound-404-illustration";
import { RouterBackButton } from "@/components/atoms/router-back-button";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
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
            Let's return to the right path.
          </EmptyStateDescription>
        </EmptyStateTextContent>
        <EmptyStateAction>
          <RouterBackButton variant="outline" />
          <Button asChild>
            <Link href="/home">
              <Home className="mr-2 h-5 w-5" />
              Go home
            </Link>
          </Button>
        </EmptyStateAction>
      </EmptyState>
    </div>
  );
}
