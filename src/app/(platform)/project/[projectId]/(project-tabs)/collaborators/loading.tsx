import {
  CardHeader,
  CardHeaderActions,
  CardHeaderTextContent,
} from "@/components/molecules/card-header";
import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <TableWrapper>
      <CardHeader>
        <CardHeaderTextContent>
          <Skeleton className="h-[2.4rem] w-48" />
          <Skeleton className="h-[1.6rem] w-full max-w-sm" />
        </CardHeaderTextContent>
        <CardHeaderActions>
          <Skeleton className="h-10 w-[185px]" />
        </CardHeaderActions>
      </CardHeader>
      <TableSkeleton columnCount={3} rowCount={5} />
    </TableWrapper>
  );
}
