import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitleAndSupporting,
} from "@/components/molecules/header";
import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Header>
        <Skeleton className="h-[22.4px] w-60" />
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <Skeleton className="h-12 w-60" />
            <Skeleton className="h-[25.6px] w-40" />
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Skeleton className="h-10 w-[140px]" />
            <Skeleton className="h-10 w-10" />
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <TableWrapper>
          <TableSkeleton columnCount={2} rowCount={5} />
        </TableWrapper>
      </MainContainer>
    </>
  );
}
