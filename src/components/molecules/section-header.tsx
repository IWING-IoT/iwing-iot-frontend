import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return <div className={cn("min-h-10 flex gap-4", className)}>{children}</div>;
}

export function SectionHeaderTextContent({
  children,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-1", className)}>
      {children}
    </div>
  );
}

export function SectionHeaderTitle({
  children,
  className,
}: SectionHeaderProps) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function SectionHeaderDescription({
  children,
  className,
}: SectionHeaderProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

export function SectionHeaderAction({
  children,
  className,
}: SectionHeaderProps) {
  return <div className={cn("flex gap-3", className)}>{children}</div>;
}
