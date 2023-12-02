import AlertIllustration from "@/components/atoms/illustrations/alert-illustration";
import NotFoundIllustration from "@/components/atoms/illustrations/not-found-illustration";
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

export default function Denied() {
  return (
    <div className="flex h-screen">
      <EmptyState>
        <EmptyStateImage>
          <AlertIllustration />
        </EmptyStateImage>
        <EmptyStateTextContent>
          <EmptyStateTitle>
            You don't have permission to access this page.
          </EmptyStateTitle>
          <EmptyStateDescription>Let's go back home.</EmptyStateDescription>
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