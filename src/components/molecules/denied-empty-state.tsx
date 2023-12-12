"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { UnauthorizedIllustration } from "../atoms/illustrations/unauthorized-illustration";
import {
  EmptyState,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from "./empty-state";
import { useRouter } from "next/navigation";

export function DeniedEmptyState() {
  const router = useRouter();
  return (
    <EmptyState>
      <EmptyStateImage>
        <UnauthorizedIllustration />
      </EmptyStateImage>
      <EmptyStateTextContent>
        <EmptyStateTitle>
          You don't have permission to access this page.
        </EmptyStateTitle>
        <EmptyStateDescription>Let's go back.</EmptyStateDescription>
      </EmptyStateTextContent>
      <EmptyStateAction>
        <Button onClick={router.back}>
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </EmptyStateAction>
    </EmptyState>
  );
}
