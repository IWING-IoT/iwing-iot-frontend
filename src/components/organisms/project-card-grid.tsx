import { TProject } from "@/lib/type";
import ProjectCard from "../molecules/project-card";
import { formatDate } from "@/lib/utils";
import { fetchProject } from "@/lib/data-fetching";

const skeletonCount = 3;
const loadingSkeletons = Array.from(
  { length: skeletonCount },
  (_, index) => index + 1,
);

export async function ProjectCardGrid({
  searchQuery,
  sortBy,
}: {
  searchQuery: string;
  sortBy: string;
}) {
  const { data } = await fetchProject(searchQuery, sortBy);
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {data.map((project: TProject) => (
        <ProjectCard
          key={project.id}
          title={project.name}
          owner={project.owner}
          location={project.location}
          startedAt={formatDate(project.startedAt)}
        />
      ))}
    </div>
  );
}

function ProjectCardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {loadingSkeletons.map((skeleton) => (
        <ProjectCard key={skeleton} loading={true} />
      ))}
    </div>
  );
}

export default ProjectCardGridSkeleton;
