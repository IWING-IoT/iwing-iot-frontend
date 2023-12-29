import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import { MainContainer } from "@/components/templates/main-container";
import { ProjectDropdown } from "@/components/organisms/dropdowns/project-dropdowm";
import { Info } from "lucide-react";

type ProjectProps = {
  params: { projectId: string };
  children: React.ReactNode;
};

const tabs = [
  { label: "Deployments", href: "deployments" },
  { label: "Collaborators", href: "collaborators" },
  { label: "Attribute data", href: "attribute-data" },
];

export default async function Layout({ params, children }: ProjectProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        <HeaderContent className="flex-row">
          <HeaderTitleAndSupporting>
            <HeaderTitle>{projectData.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <ProjectDropdown
              projectId={params.projectId}
              projectData={projectData}
            />
          </HeaderActions>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="project" />
      </Header>
      {projectData.isArchived && (
        <div className="flex items-center gap-2 border-b px-6 py-4 text-sm text-muted-foreground">
          <Info className="h-4 w-4 shrink-0" />
          This project has been archived. You can't make any changes to it.
        </div>
      )}
      <MainContainer>{children}</MainContainer>
    </>
  );
}
