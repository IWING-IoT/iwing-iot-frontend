import { cn } from "@/lib/utils";

type LoadingIndicatorProps = {
  className?: string;
};

export function LoadingIndicator({ className }: LoadingIndicatorProps) {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center space-x-2",
        className,
      )}
    >
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
      <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
      <div className="h-4 w-4 animate-bounce rounded-full bg-primary" />
    </div>
  );
}
