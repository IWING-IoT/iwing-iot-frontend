import { UnauthorizedIllustration } from "@/components/atoms/illustrations/unauthorized-illustration";
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
    <EmptyState>
      <EmptyStateImage>
        <UnauthorizedIllustration />
      </EmptyStateImage>
      <EmptyStateTextContent>
        <EmptyStateTitle>
          You don't have permission to access this page.
        </EmptyStateTitle>
        <EmptyStateDescription>Let's go back home.</EmptyStateDescription>
      </EmptyStateTextContent>
      <EmptyStateAction>
        <Button asChild>
          <Link href="/home">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back home
          </Link>
        </Button>
      </EmptyStateAction>
    </EmptyState>
  );
}
