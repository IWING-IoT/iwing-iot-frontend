import {
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderTextContent,
  SectionHeaderTitle,
} from "@/components/molecules/section-header";
import { CardSkeleton } from "@/components/skeleton/card-skeleton";
import { CardGrid } from "@/components/templates/card-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <SectionHeader>
        <SectionHeaderTextContent>
          <Skeleton className="h-10 w-40" />
        </SectionHeaderTextContent>
        <SectionHeaderAction>
          <Skeleton className="h-10 w-[171px]" />
        </SectionHeaderAction>
      </SectionHeader>
      <CardGrid>
        <CardSkeleton variant="deployment" />
        <CardSkeleton variant="deployment" />
        <CardSkeleton variant="deployment" />
      </CardGrid>
    </>
  );
}
