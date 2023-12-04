import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/molecules/breadcrumbs";
import { DeploymentDropdown } from "@/components/molecules/dropdowns/deployment-dropdown";
import { ProjectMoreDropdown } from "@/components/molecules/dropdowns/project-more-dropdowm";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import MainContainer from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TPhaseDetails, TProjectDetails } from "@/lib/type";

const tabs = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Map", href: "map" },
  { label: "Devices", href: "devices" },
  { label: "API settings", href: "api-settings" },
];

type LayoutProps = {
  params: { projectId: string; phaseId: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  // console.log("params", params);
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: phaseData }: { data: TPhaseDetails } = await fetchData(
    `/phase/${params.phaseId}`,
  );
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        {/* <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home?sortBy=ascending">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink isCurrentPage>{data.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb> */}
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>
              {projectData.name} ({phaseData.name})
            </HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <DeploymentDropdown />
            <ProjectMoreDropdown
              projectId={params.projectId}
              projectData={projectData}
            />
          </HeaderActions>
        </HeaderContent>
        <NavTabs tabs={tabs} />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
