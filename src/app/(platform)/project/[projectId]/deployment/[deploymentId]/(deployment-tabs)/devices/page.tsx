import { deploymentDevicesColumns } from "@/components/columns/deployment-devices-columns";
import { DataTable } from "@/components/data-table/data-table";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { fetchData } from "@/lib/data-fetching";
// import { deploymentDevicesData } from "@/lib/mock";
import { TDeploymentDeviceDetails } from "@/lib/type";

type DeploymentDevicesProps = {
  params: {
    deploymentId: string;
  };
};

export default async function DeploymentDevices({
  params,
}: DeploymentDevicesProps) {
  const { data: deploymentDevicesData }: { data: TDeploymentDeviceDetails[] } =
    await fetchData(`/phase/${params.deploymentId}/device`);
  return (
    <TableWrapper>
      <DataTable
        columns={deploymentDevicesColumns}
        data={deploymentDevicesData}
        searchByColumn="alias"
        enableToggleColumns
      />
    </TableWrapper>
  );
}
