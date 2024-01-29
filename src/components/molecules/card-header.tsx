import { cn } from "@/lib/utils";

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 border-b px-6 py-5 sm:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeaderTextContent({
  children,
  className,
}: CardHeaderProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-1", className)}>
      {children}
    </div>
  );
}

export function CardHeaderTitle({ children, className }: CardHeaderProps) {
  return (
    <h2 className={cn("text-xl font-semibold sm:text-2xl", className)}>
      {children}
    </h2>
  );
}

export function CardHeaderDescription({
  children,
  className,
}: CardHeaderProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

export function CardHeaderActions({ children, className }: CardHeaderProps) {
  return <div className={cn("flex gap-3", className)}>{children}</div>;
}
