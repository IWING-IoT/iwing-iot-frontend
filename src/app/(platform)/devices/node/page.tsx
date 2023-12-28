import { devicesColumns } from "@/components/columns/devices-colmns";
import { DataTable } from "@/components/data-table/data-table";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { fetchData } from "@/lib/data-fetching";
import { TDevices } from "@/lib/type";

export default async function Node() {
  const { data: nodeData }: { data: TDevices[] } = await fetchData("/device", [
    { key: "type", value: "node" },
    { key: "status", value: "all" },
  ]);
  return (
    <TableWrapper>
      <DataTable columns={devicesColumns} data={nodeData} />
    </TableWrapper>
  );
}
