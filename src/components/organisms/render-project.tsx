import { fetchData } from "@/lib/data-fetching";
import { TProject } from "@/lib/type";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "../molecules/empty-state";
import { ProjectIllustration } from "../atoms/illustrations/project-illustration";
import { NotFoundIllustration } from "../atoms/illustrations/not-found-illustration";
import { CardGrid } from "../templates/card-grid";
import { ProjectAndDeploymentCard } from "../molecules/project-and-deployment-card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

type RenderProjectProps = {
  searchQuery?: string;
  sortBy?: string;
  type: "home" | "archived-projects";
};

export async function RenderProject({
  searchQuery,
  sortBy,
  type,
}: RenderProjectProps) {
  const queryParams = [];
  if (searchQuery) {
    queryParams.push({ key: "searchQuery", value: searchQuery });
  }
  if (sortBy) {
    queryParams.push({ key: "sortBy", value: sortBy });
  }
  if (type === "archived-projects") {
    queryParams.push({ key: "status", value: "archived" });
  }

  const { data }: { data: TProject[] } = await fetchData(
    "/project",
    queryParams,
  );
  if (data.length === 0 && !searchQuery) {
    return (
      <EmptyState>
        <EmptyStateImage>
          <ProjectIllustration />
        </EmptyStateImage>
        <EmptyStateTextContent>
          <EmptyStateTitle>
            {type === "home" ? "No projects yet?" : "No archived projects yet"}
          </EmptyStateTitle>
          <EmptyStateDescription>
            {type === "home"
              ? "Start by creating your first one now!"
              : "Once you have archived projects, they will appear here."}
          </EmptyStateDescription>
        </EmptyStateTextContent>
        {type === "home" && (
          <EmptyStateAction>
            <Button asChild>
              <Link href="/project/new">
                <Plus className="mr-1.5 h-5 w-5" />
                New project
              </Link>
            </Button>
          </EmptyStateAction>
        )}
      </EmptyState>
    );
  } else if (data.length === 0 && searchQuery) {
    return (
      <EmptyState>
        <EmptyStateImage>
          <NotFoundIllustration />
        </EmptyStateImage>
        <EmptyStateTextContent>
          <EmptyStateTitle>No projects found.</EmptyStateTitle>
          <EmptyStateDescription>
            Your search did not match any project.
          </EmptyStateDescription>
        </EmptyStateTextContent>
      </EmptyState>
    );
  } else {
    return (
      <CardGrid>
        {data.map((project: TProject) => (
          <ProjectAndDeploymentCard
            key={project.id}
            href={`/project/${project.id}/deployments`}
            title={project.name}
            owner={project.owner}
            location={project.location}
            startedAt={project.startedAt}
          />
        ))}
      </CardGrid>
    );
  }
}
