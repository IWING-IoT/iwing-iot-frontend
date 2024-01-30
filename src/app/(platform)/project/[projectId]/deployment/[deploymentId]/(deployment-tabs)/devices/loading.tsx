import {
  CardHeader,
  CardHeaderActions,
  CardHeaderTextContent,
} from "@/components/molecules/card-header";
import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <MainContainer>
      <TableWrapper>
        <CardHeader>
          <CardHeaderTextContent>
            <Skeleton className="h-[2.4rem] w-28" />
            <Skeleton className="h-[1.6rem] w-full max-w-sm" />
          </CardHeaderTextContent>
          <CardHeaderActions>
            <Skeleton className="h-10 w-[134px]" />
          </CardHeaderActions>
        </CardHeader>
        <TableSkeleton columnCount={2} rowCount={5} />
      </TableWrapper>
    </MainContainer>
  );
}
