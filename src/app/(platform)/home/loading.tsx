import ProjectCard from "@/components/molecules/project-card";
import { Skeleton } from "@/components/ui/skeleton";

const skeletonCount = 3;
const loadingSkeletons = Array.from(
  { length: skeletonCount },
  (_, index) => index + 1,
);

export default function Loading() {
  return (
    <>
      <div className="flex justify-between gap-3">
        <Skeleton
          className="h-10 w-full sm:w-[400px]"
          placeholder="Search by project name"
        />
        <Skeleton className="h-10 w-10 flex-shrink-0 sm:w-36" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loadingSkeletons.map((skeleton) => (
          <ProjectCard key={skeleton} loading={true} />
        ))}
      </div>
    </>
  );
}
