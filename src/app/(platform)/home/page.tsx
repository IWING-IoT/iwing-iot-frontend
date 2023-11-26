import SortDropDown from "@/components/molecules/dropdowns/project-sort-dropdown";
import { Search } from "@/components/atoms/search";
import { Suspense } from "react";
import Loading from "./loading";
import { ProjectCardGrid } from "@/components/organisms/project-card-grid";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    searchQuery?: string;
    sortBy?: string;
  };
}) {
  const searchQuery = searchParams?.searchQuery || "";
  const sortBy = searchParams?.sortBy || "";

  if (!sortBy) {
    redirect("/home?sortBy=ascending");
  }

  return (
    <>
      <div className="flex justify-between gap-3">
        <Search className="sm:w-[400px]" placeholder="Search by project name" />
        <SortDropDown />
      </div>
      <Suspense fallback={<Loading />}>
        <ProjectCardGrid searchQuery={searchQuery} sortBy={sortBy} />
      </Suspense>
    </>
  );
}
