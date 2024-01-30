import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[131px] w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
    </>
  );
}
