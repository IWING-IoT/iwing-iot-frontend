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

type PhaseProps = {
  params: { projectId: string };
  children: React.ReactNode;
};

const tabs = [
  { label: "Deployments", href: "deployments" },
  { label: "Collaborators", href: "collaborators" },
  { label: "Attribute data", href: "attribute-data" },
];

export default async function Layout({ params, children }: PhaseProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{projectData.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="project" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
