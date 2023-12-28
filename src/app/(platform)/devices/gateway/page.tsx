import { devicesColumns } from "@/components/columns/devices-colmns";
import { DataTable } from "@/components/data-table/data-table";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { fetchData } from "@/lib/data-fetching";
import { TDevices } from "@/lib/type";

export default async function Gateway() {
  const { data: gatewayData }: { data: TDevices[] } = await fetchData(
    "/device",
    [
      { key: "type", value: "gateway" },
      { key: "status", value: "all" },
    ],
  );
  return (
    <TableWrapper>
      <DataTable columns={devicesColumns} data={gatewayData} />
    </TableWrapper>
  );
}
