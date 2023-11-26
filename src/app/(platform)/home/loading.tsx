import ProjectCard from "@/components/molecules/project-card";

const skeletonCount = 3;
const loadingSkeletons = Array.from(
  { length: skeletonCount },
  (_, index) => index + 1,
);

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {loadingSkeletons.map((skeleton) => (
        <ProjectCard key={skeleton} loading={true} />
      ))}
    </div>
  );
}
