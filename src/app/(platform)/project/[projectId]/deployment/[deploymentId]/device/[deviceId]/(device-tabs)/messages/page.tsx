import { messagesColumns } from "@/components/columns/messages-columns";
import { DataTable } from "@/components/data-table/data-table";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TMessage } from "@/lib/type";
import { DownloadCloud } from "lucide-react";

type MessagesProps = {
  params: {
    projectId: string;
    deploymentId: string;
    deviceId: string;
  };
};

export default async function Messages({ params }: MessagesProps) {
  const { data: messagesData }: { data: TMessage[] } = await fetchData(
    `/devicePhase/${params.deviceId}/message`,
  );
  return (
    <TableWrapper>
      <CardHeader>
        <CardHeaderTextContent>
          <CardHeaderTitle>Messages</CardHeaderTitle>
        </CardHeaderTextContent>
        <CardHeaderActions>
          <Button>
            <DownloadCloud className="mr-2 h-5 w-5" />
            Download as CSV
          </Button>
        </CardHeaderActions>
      </CardHeader>
      <DataTable
        columns={messagesColumns}
        data={messagesData}
        clickableRows
        clickableRowsBaseURL={`/project/${params.projectId}/deployment/${params.deploymentId}/device/${params.deviceId}/message`}
        showToolbar={false}
      />
    </TableWrapper>
  );
}
