import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/molecules/breadcrumbs";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderDescription,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { NavTabs } from "@/components/molecules/nav-tabs";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentDetails, TProjectDetails } from "@/lib/type";
import { KeyRound, MoreHorizontal } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    projectId: string;
    deploymentId: string;
    deviceId: string;
  };
};

export default async function Layout({ children, params }: LayoutProps) {
  const tabs = [
    { label: "Overview", href: "overview" },
    { label: "Messages", href: "messages" },
    { label: "Firmware", href: "firmware" },
  ];
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: deploymentData }: { data: TDeploymentDetails } =
    await fetchData(`/phase/${params.deploymentId}`);
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/project/${params.projectId}/deployments`}>
              {projectData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/project/${params.projectId}/deployment/${params.deploymentId}/dashboard`}
            >
              {deploymentData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/project/${params.projectId}/deployment/${params.deploymentId}/devices`}
            >
              Devices
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink isCurrentPage>Hello</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>Device alias</HeaderTitle>
            <HeaderDescription>Device name</HeaderDescription>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button variant={"outline"}>
              <KeyRound className="mr-2 h-5 w-5" />
              JWT
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </HeaderActions>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="deploymentDevice" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
