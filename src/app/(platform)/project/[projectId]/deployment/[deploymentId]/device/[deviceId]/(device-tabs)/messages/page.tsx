// import { DownloadMessagesButton } from "@/components/atoms/download-messages-button";
import { messagesColumns } from "@/components/columns/messages-columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/pagination";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { DateTimePickerDropdown } from "@/components/organisms/dropdowns/date-time-picker-dropdown";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchData } from "@/lib/data-fetching";
import { TMessage } from "@/lib/type";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

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
  searchParams: {
    currentPage?: string;
    pageSize?: string;
  };
};

export default async function Messages({
  params,
  searchParams,
}: MessagesProps) {
  if (!searchParams.currentPage || !searchParams.pageSize) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/device/${params.deviceId}/messages?currentPage=1&pageSize=10`,
    );
  }
  const { data: messagesData, count }: { data: TMessage[]; count: string } =
    await fetchData(`/devicePhase/${params.deviceId}/message`, [
      { key: "page", value: searchParams.currentPage },
      { key: "limit", value: searchParams.pageSize },
    ]);
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
        usePagination={false}
      />
      <DataTablePagination
        manualPagination
        currentPage={Number(searchParams.currentPage)}
        pageCount={Math.ceil(Number(count) / Number(searchParams.pageSize))}
        pageSize={Number(searchParams.pageSize)}
      />
    </TableWrapper>
  );
}
