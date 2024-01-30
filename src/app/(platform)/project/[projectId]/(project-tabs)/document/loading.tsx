import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative flex-1 rounded-lg border p-6">
      <Skeleton className="absolute right-6 top-6 h-10 w-[87px]" />
      <Skeleton className="h-10 w-64" />
    </div>
  );
}
