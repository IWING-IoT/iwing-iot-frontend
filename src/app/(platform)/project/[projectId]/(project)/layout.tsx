import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";
import {
  Header,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import { MainContainer } from "@/components/templates/main-container";
import { ProjectDropdown } from "@/components/molecules/dropdowns/project-dropdowm";

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
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <div className="flex gap-2">
              <HeaderTitle>{projectData.name}</HeaderTitle>
              <ProjectDropdown
                projectId={params.projectId}
                projectData={projectData}
              />
            </div>
          </HeaderTitleAndSupporting>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="project" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
