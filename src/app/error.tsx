"use client";

import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <EmptyState>
        <EmptyStateTextContent>
          <EmptyStateTitle>
            Sorry, we've run into an issue on our end.
          </EmptyStateTitle>
          <EmptyStateDescription>
            (Error: {error.message})
          </EmptyStateDescription>
        </EmptyStateTextContent>
        <EmptyStateAction>
          <Button onClick={() => reset()}>
            <RotateCcw className="mr-2 h-5 w-5" />
            Try again
          </Button>
        </EmptyStateAction>
      </EmptyState>
    </div>
  );
}
