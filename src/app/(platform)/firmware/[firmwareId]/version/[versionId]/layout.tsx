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
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TFirmwareDetails, TFirmwareVersionDetails } from "@/lib/type";
import { firmwareType } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    firmwareId: string;
    versionId: string;
  };
};

export default async function Layout({ children, params }: LayoutProps) {
  const tabs = [
    { label: "Code", href: "code" },
    { label: "About", href: "about" },
  ];
  const { data: firmwareData }: { data: TFirmwareDetails } = await fetchData(
    `/firmware/${params.firmwareId}`,
  );
  const { data: firmwareVersionData }: { data: TFirmwareVersionDetails } =
    await fetchData(`/firmwareVersion/${params.versionId}`);
  return (
    <>
      <Header className="pb-0 sm:pb-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/firmware/${firmwareData.type}`}>
              {firmwareType[firmwareData.type]}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/firmware/${params.firmwareId}`}>
              {firmwareData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink isCurrentPage>
              {firmwareVersionData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{firmwareVersionData.name}</HeaderTitle>
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button variant={"outline"} size={"icon"}>
              <MoreHorizontal />
            </Button>
          </HeaderActions>
        </HeaderContent>
        <NavTabs tabs={tabs} layoutId="firmwareVersion" />
      </Header>
      <MainContainer>{children}</MainContainer>
    </>
  );
}
