import { Search } from "@/components/atoms/search";
import { redirect } from "next/navigation";
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
import { SortDropDown } from "@/components/organisms/dropdowns/project-sort-dropdown";
import { MainContainer } from "@/components/templates/main-container";
import { Suspense } from "react";
import { CardGridSkeleton } from "@/components/skeleton/card-skeleton";
import { RenderProject } from "@/components/organisms/render-project";

type HomeProps = {
  searchParams?: {
    searchQuery?: string;
    sortBy?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const searchQuery = searchParams?.searchQuery || "";
  const sortBy = searchParams?.sortBy || "";

  if (!sortBy) {
    redirect("/home?sortBy=ascending");
  }

  const session = await getServerAuthSession();

  return (
    <>
      <Header>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Welcome back, {session?.user.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button asChild>
              <Link href="/project/new">
                <Plus className="mr-1.5 h-5 w-5" />
                New project
              </Link>
            </Button>
          </HeaderActions>
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
            type="home"
          />
        </Suspense>
      </MainContainer>
    </>
  );
}
