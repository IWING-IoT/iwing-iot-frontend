import {
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderTextContent,
  SectionHeaderTitle,
} from "../molecules/section-header";
import { CardGrid } from "../templates/card-grid";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type CardSkeletonProps = {
  variant: "project" | "deployment" | "metric" | "chart" | "metricNoIcon";
};

export function CardSkeleton({ variant }: CardSkeletonProps) {
  if (variant === "metric") {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="mb-4 h-12 w-12 rounded-lg" />
          <Skeleton className="mb-2 h-5 w-32 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-full" />
        </CardHeader>
      </Card>
    );
  } else if (variant === "metricNoIcon") {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="mb-2 h-5 w-32 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-full" />
        </CardHeader>
      </Card>
    );
  } else if (variant === "chart") {
    return (
      <Card>
        <CardHeader>
          <SectionHeader>
            <SectionHeaderTextContent>
              <SectionHeaderTitle>
                <Skeleton className="h-7 w-64" />
              </SectionHeaderTitle>
            </SectionHeaderTextContent>
            <SectionHeaderAction>
              <Skeleton className="h-8 w-32" />
            </SectionHeaderAction>
          </SectionHeader>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-60 w-full rounded-lg" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-40 rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 text-muted-foreground">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-48 rounded-full" />
          </div>
          {variant === "project" && (
            <div className="flex gap-2">
              <Skeleton className="h-6 w-64 rounded-full" />
            </div>
          )}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-56 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const skeletonCount = 3;
const loadingSkeletons = Array.from(
  { length: skeletonCount },
  (_, index) => index + 1,
);

type CardGridSkeletonProps = {
  variant: "project" | "deployment";
};

export function CardGridSkeleton({ variant }: CardGridSkeletonProps) {
  return (
    <CardGrid>
      {loadingSkeletons.map((index) => (
        <CardSkeleton key={index} variant={variant} />
      ))}
    </CardGrid>
  );
}
