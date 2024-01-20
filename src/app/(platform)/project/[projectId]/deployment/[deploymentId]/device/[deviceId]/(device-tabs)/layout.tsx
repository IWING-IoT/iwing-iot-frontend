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
import { DeploymentDevicesDropdown } from "@/components/organisms/dropdowns/deployment-devices-dropdown";
import { JWTDropdown } from "@/components/organisms/dropdowns/jwt-dropdown";
import { MainContainer } from "@/components/templates/main-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import {
  TDeploymentDetails,
  TDeploymentDeviceDetails,
  TDevices,
  TProjectDetails,
} from "@/lib/type";
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
  const gatewayTabs = [
    { label: "Overview", href: "overview" },
    { label: "Nodes", href: "nodes" },
    { label: "Messages", href: "messages" },
    { label: "Firmware", href: "firmware" },
  ];
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: deploymentData }: { data: TDeploymentDetails } =
    await fetchData(`/phase/${params.deploymentId}`);
  const {
    data: deviceData,
  }: {
    data: TDeploymentDeviceDetails;
  } = await fetchData(`/devicePhase/${params.deviceId}`);
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
            <BreadcrumbLink isCurrentPage>{deviceData.alias}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <div className="flex flex-col gap-2 sm:flex-row">
              <HeaderTitle>{deviceData.alias}</HeaderTitle>
              <div className="flex items-center gap-2">
                {deviceData?.associate.map((associate) => (
                  <Badge key={associate.id} variant={"modern"}>
                    {associate.name}
                  </Badge>
                ))}
              </div>
            </div>
            {/* <HeaderDescription>{deviceData.name}</HeaderDescription> */}
          </HeaderTitleAndSupporting>
          <HeaderActions>
            {deviceData.jwt && (
              <JWTDropdown jwt={deviceData.jwt} deviceId={params.deviceId} />
            )}
            <DeploymentDevicesDropdown
              type="inPage"
              deploymentDeviceData={deviceData}
              projectId={params.projectId}
              deploymentId={params.deploymentId}
              deviceId={params.deviceId}
            />
          </HeaderActions>
        </HeaderContent>
        <NavTabs
          tabs={deviceData.type === "gateway" ? gatewayTabs : tabs}
          layoutId="deploymentDevice"
        />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
