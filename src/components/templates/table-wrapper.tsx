import { cn } from "@/lib/utils";

type TableWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function TableWrapper({ children, className }: TableWrapperProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-xl border shadow-xs", className)}
    >
      {children}
    </div>
  );
}
