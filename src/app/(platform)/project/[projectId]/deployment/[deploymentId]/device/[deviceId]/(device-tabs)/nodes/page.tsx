import { nodesListColumns } from "@/components/columns/nodes-list-columns";
import { DataTable } from "@/components/data-table/data-table";
import {
  CardHeader,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { CardDescription } from "@/components/ui/card";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentDeviceDetails } from "@/lib/type";

type NodesProps = {
  params: {
    projectId: string;
    deploymentId: string;
    deviceId: string;
  };
};

export default async function Nodes({ params }: NodesProps) {
  const { data: nodesData }: { data: Omit<TDeploymentDeviceDetails, "jwt">[] } =
    await fetchData(`/devicePhase/${params.deviceId}/gateway`);
  return (
    <TableWrapper>
      <CardHeader>
        <CardHeaderTextContent>
          <CardHeaderTitle>Nodes</CardHeaderTitle>
          <CardDescription>
            View list of nodes connected to this gateway here.
          </CardDescription>
        </CardHeaderTextContent>
      </CardHeader>
      <DataTable
        columns={nodesListColumns}
        data={nodesData}
        searchByColumn="alias"
        enableToggleColumns
        clickableRows
        clickableRowsBaseURL={`/project/${params.projectId}/deployment/${params.deploymentId}/device`}
        clickableRowsTrailURL="/overview"
      />
    </TableWrapper>
  );
}
