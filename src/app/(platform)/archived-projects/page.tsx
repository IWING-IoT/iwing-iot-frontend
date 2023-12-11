import { Search } from "@/components/atoms/search";
import { redirect } from "next/navigation";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitleAndSupporting,
  HeaderTitle,
} from "@/components/molecules/header";
import { SortDropDown } from "@/components/molecules/dropdowns/project-sort-dropdown";
import { MainContainer } from "@/components/templates/main-container";
import { Suspense } from "react";
import { CardGridSkeleton } from "@/components/skeleton/card-skeleton";
import { RenderProject } from "@/components/organisms/render-project";

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
          <RenderProject
            searchQuery={searchQuery}
            sortBy={sortBy}
            type="archived-projects"
          />
        </Suspense>
      </MainContainer>
    </>
  );
}
