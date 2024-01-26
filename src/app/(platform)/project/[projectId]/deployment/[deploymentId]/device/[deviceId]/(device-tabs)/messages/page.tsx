// import { DownloadMessagesButton } from "@/components/atoms/download-messages-button";
import { messagesColumns } from "@/components/columns/messages-columns";
import { DataTable } from "@/components/data-table/data-table";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchData } from "@/lib/data-fetching";
import { TMessage } from "@/lib/type";
import dynamic from "next/dynamic";

const DownloadMessagesButton = dynamic(
  () => import("@/components/atoms/download-messages-button"),
  { ssr: false },
);

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
          <DownloadMessagesButton
            deploymentId={params.deploymentId}
            deviceId={params.deviceId}
          />
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
