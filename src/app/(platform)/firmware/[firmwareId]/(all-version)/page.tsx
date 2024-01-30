import { firmwareVersionsColumns } from "@/components/columns/firmware-versions-columns";
import { DataTable } from "@/components/data-table/data-table";
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
import { FirmwareDropdown } from "@/components/organisms/dropdowns/firmware-dropdown";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TFirmwareDetails } from "@/lib/type";
import { firmwareType } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

type FirmwareProps = {
  params: {
    firmwareId: string;
  };
};

export default async function Firmware({ params }: FirmwareProps) {
  const { data: firmwareData }: { data: TFirmwareDetails } = await fetchData(
    `/firmware/${params.firmwareId}`,
  );
  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/firmware/${firmwareData.type}`}>
              {firmwareType[firmwareData.type]}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink isCurrentPage>{firmwareData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <HeaderTitle>{firmwareData.name}</HeaderTitle>
            {firmwareData.description && (
              <HeaderDescription>{firmwareData.description}</HeaderDescription>
            )}
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Button asChild>
              <Link href={`/firmware/${params.firmwareId}/version/new`}>
                <Plus className="mr-1.5 h-5 w-5" />
                New version
              </Link>
            </Button>
            <FirmwareDropdown
              firmwareId={params.firmwareId}
              firmwareData={firmwareData}
            />
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <TableWrapper>
          <DataTable
            columns={firmwareVersionsColumns}
            data={firmwareData.versions}
            clickableRows
            clickableRowsBaseURL={`/firmware/${params.firmwareId}/version`}
            clickableRowsTrailURL="/code"
          />
        </TableWrapper>
      </MainContainer>
    </>
  );
}
