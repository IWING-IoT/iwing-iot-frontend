import { Search } from "@/components/atoms/search";
import { redirect } from "next/navigation";
import { TProject } from "@/lib/type";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitleAndSupporting,
  HeaderTitle,
} from "@/components/molecules/header";
import { getServerAuthSession } from "@/lib/auth";
import { CardGrid } from "@/components/templates/card-grid";
import { NotFoundIllustration } from "@/components/atoms/illustrations/not-found-illustration";
import { ProjectIllustration } from "@/components/atoms/illustrations/project-illustration";
import { SortDropDown } from "@/components/molecules/dropdowns/project-sort-dropdown";
import { ProjectAndDeploymentCard } from "@/components/molecules/project-and-deployment-card";
import { MainContainer } from "@/components/templates/main-container";
import { Suspense } from "react";
import { CardGridSkeleton } from "@/components/skeleton/card-skeleton";
import { fetchData } from "@/lib/data-fetching";

type RenderProjectProps = {
  searchQuery?: string;
  sortBy?: string;
};

async function RenderProject({ searchQuery, sortBy }: RenderProjectProps) {
  const queryParams = [{ key: "type", value: "archived" }];
  if (searchQuery) {
    queryParams.push({ key: "searchQuery", value: searchQuery });
  }
  if (sortBy) {
    queryParams.push({ key: "sortBy", value: sortBy });
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
          <EmptyStateTitle>No archived projects yet</EmptyStateTitle>
          <EmptyStateDescription>
            Once you have archived projects, they will appear here.
          </EmptyStateDescription>
        </EmptyStateTextContent>
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
            location={project.location.en_name}
            startedAt={project.startedAt}
          />
        ))}
      </CardGrid>
    );
  }
}

type ArchivedProjectsProps = {
  searchParams?: {
    searchQuery?: string;
    sortBy?: string;
  };
};

export default function ArchivedProjects({
  searchParams,
}: ArchivedProjectsProps) {
  const searchQuery = searchParams?.searchQuery || "";
  const sortBy = searchParams?.sortBy || "";

  if (!sortBy) {
    redirect("/archived-projects?sortBy=ascending");
  }

  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Archived projects</HeaderTitle>
          </HeaderTitleAndSupporting>
        </HeaderContent>
      </Header>
      <MainContainer>
        <div className="flex justify-between gap-3">
          <Search
            className="sm:w-[400px]"
            placeholder="Search by project name"
          />
          <SortDropDown />
        </div>
        <Suspense
          key={`${searchParams?.searchQuery}-${searchParams?.sortBy}`}
          fallback={<CardGridSkeleton variant="project" />}
        >
          <RenderProject searchQuery={searchQuery} sortBy={sortBy} />
        </Suspense>
      </MainContainer>
    </>
  );
}
