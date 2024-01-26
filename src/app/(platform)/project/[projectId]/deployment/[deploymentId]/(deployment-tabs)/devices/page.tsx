import { deploymentDevicesColumns } from "@/components/columns/deployment-devices-columns";
import { DataTable } from "@/components/data-table/data-table";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderDescription,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import Restricted from "@/components/providers/permission-provider/restricted";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentDeviceDetails } from "@/lib/type";
import { Plus } from "lucide-react";
import Link from "next/link";

type DeploymentDevicesProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
};

export default async function DeploymentDevices({
  params,
}: DeploymentDevicesProps) {
  const { data: deploymentDevicesData }: { data: TDeploymentDeviceDetails[] } =
    await fetchData(`/phase/${params.deploymentId}/device`);
  return (
    <MainContainer>
      <TableWrapper>
        <CardHeader>
          <CardHeaderTextContent>
            <CardHeaderTitle>Devices</CardHeaderTitle>
            <CardHeaderDescription>
              View and manage devices in this deployment.
            </CardHeaderDescription>
          </CardHeaderTextContent>
          <Restricted to="edit">
            <CardHeaderActions>
              <Button asChild>
                <Link
                  href={`/project/${params.projectId}/deployment/${params.deploymentId}/device/add`}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add device
                </Link>
              </Button>
            </CardHeaderActions>
          </Restricted>
        </CardHeader>
        <DataTable
          columns={deploymentDevicesColumns}
          data={deploymentDevicesData}
          searchByColumn="alias"
          enableToggleColumns
          clickableRows
          clickableRowsBaseURL={`/project/${params.projectId}/deployment/${params.deploymentId}/device`}
          clickableRowsTrailURL="/overview"
        />
      </TableWrapper>
    </MainContainer>
  );
}
