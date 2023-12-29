import { DiffViewer } from "@/components/atoms/diff-viewer";
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
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData, getFile } from "@/lib/data-fetching";
import { newCode, oldCode } from "@/lib/mock";
import { TFirmwareDetails, TFirmwareVersionDetails } from "@/lib/type";
import { firmwareType } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

type FirmwareVersionProps = {
  params: {
    firmwareId: string;
    versionId: string;
  };
};

export default async function FirmwareVersion({
  params,
}: FirmwareVersionProps) {
  const { data: firmwareData }: { data: TFirmwareDetails } = await fetchData(
    `/firmware/${params.firmwareId}`,
  );
  const { data: firmwareVersionData }: { data: TFirmwareVersionDetails } =
    await fetchData(`/firmwareVersion/${params.versionId}`);
  const response: string = await getFile(firmwareVersionData.file);
  return (
    <>
      <Header>
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
      </Header>
      <MainContainer>
        <DiffViewer oldCode={oldCode} newCode={newCode} language="cpp" />
      </MainContainer>
    </>
  );
}
