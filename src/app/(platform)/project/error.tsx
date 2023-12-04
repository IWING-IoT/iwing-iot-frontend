"use client";

import SorryIllustration from "@/components/atoms/illustrations/sorry-illustration";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <EmptyState>
      <EmptyStateImage>
        <SorryIllustration />
      </EmptyStateImage>
      <EmptyStateTextContent>
        <EmptyStateTitle>
          We encountered an issue while trying to retrieve this project.
        </EmptyStateTitle>
        <EmptyStateDescription>(Error: {error.message})</EmptyStateDescription>
      </EmptyStateTextContent>
      <EmptyStateAction>
        <Button variant={"outline"} asChild>
          <Link href="/home?sortBy=ascending">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back home
          </Link>
        </Button>
        <Button onClick={() => reset()}>
          <RotateCcw className="mr-2 h-5 w-5" />
          Try again
        </Button>
      </EmptyStateAction>
    </EmptyState>
  );
}
