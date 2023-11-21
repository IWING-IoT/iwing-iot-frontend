import { cn } from "@/lib/utils";

type MainContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MainContainer({
  children,
  className,
}: MainContainerProps) {
  return (
    <main className={cn("flex flex-col gap-4 p-4 sm:gap-6 sm:p-6", className)}>
      {children}
    </main>
  );
}
