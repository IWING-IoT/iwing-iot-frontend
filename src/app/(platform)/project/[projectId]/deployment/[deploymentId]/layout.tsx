import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/molecules/breadcrumbs";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import { DeploymentDropdown } from "@/components/organisms/dropdowns/deployment-dropdown";
import PermissionProvider from "@/components/providers/permission-provider/permission-provider";
import { MainContainer } from "@/components/templates/main-container";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentDetails, TProjectDetails } from "@/lib/type";
import { permission } from "@/lib/utils";

const tabs = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Map", href: "map" },
  { label: "Devices", href: "devices" },
  { label: "API settings", href: "api-settings" },
];

type LayoutProps = {
  params: { projectId: string; deploymentId: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  // console.log("params", params);
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: deploymentData }: { data: TDeploymentDetails } =
    await fetchData(`/phase/${params.deploymentId}`);

  let permissions;
  if (projectData.isArchived === true) {
    permissions = permission.project_archived;
  } else if (deploymentData.isActive === false) {
    permissions = permission.deployment_finished;
  } else {
    permissions = permission[projectData.permission];
  }

  return (
    <PermissionProvider permissions={permissions}>
      <Header className="pb-0 sm:pb-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/project/${params.projectId}/deployments`}>
              {projectData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink isCurrentPage>{deploymentData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{deploymentData.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <DeploymentDropdown deploymentData={deploymentData} />
          </HeaderActions>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="deployment" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </PermissionProvider>
  );
}
