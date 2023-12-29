import { firmwareColumns } from "@/components/columns/firmware-columns";
import { DataTable } from "@/components/data-table/data-table";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { fetchData } from "@/lib/data-fetching";
import { TFirmware } from "@/lib/type";

export default async function Source() {
  const { data: sourceCodeData }: { data: TFirmware[] } = await fetchData(
    "/firmware",
    [{ key: "type", value: "source" }],
  );
  return (
    <TableWrapper>
      <DataTable
        columns={firmwareColumns}
        data={sourceCodeData}
        clickableRows
        clickableRowsBaseURL="/firmware"
      />
    </TableWrapper>
  );
}
