import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { TableWrapper } from "@/components/templates/table-wrapper";

export default function Loading() {
  return (
    <TableWrapper>
      <TableSkeleton columnCount={3} rowCount={5} />
    </TableWrapper>
  );
}
