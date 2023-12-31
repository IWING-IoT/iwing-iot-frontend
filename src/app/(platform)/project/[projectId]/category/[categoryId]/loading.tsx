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
        <Skeleton className="h-6 w-80" />
        <HeaderContent>
          <HeaderTitleAndSupporting>
            <Skeleton className="h-[2.4rem] w-64 sm:h-[3rem]" />
            <Skeleton className="h-[1.6rem] w-48" />
          </HeaderTitleAndSupporting>
          <HeaderActions>
            <Skeleton className="h-10 w-[123px]" />
            <Skeleton className="h-10 w-10" />
          </HeaderActions>
        </HeaderContent>
      </Header>
      <MainContainer>
        <TableWrapper>
          <TableSkeleton columnCount={3} rowCount={5} />
        </TableWrapper>
      </MainContainer>
    </>
  );
}
