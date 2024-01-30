"use client";
import { dashboardBatteryColumns } from "@/components/columns/dashboard-battery-columns";
import { dashboardLastConnectionColumns } from "@/components/columns/dashboard-last-connection-columns";
import { DataTable } from "@/components/data-table/data-table";
import { BatteryThresholdForm } from "@/components/forms/battery-threshold-form";
import { LastConnectionThresholdForm } from "@/components/forms/last-connection-threshold-form";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderDescription,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { MetricCard } from "@/components/molecules/metric-card";
import { CardSkeleton } from "@/components/skeleton/card-skeleton";
import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { CardGrid } from "@/components/templates/card-grid";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { clientFetchData } from "@/lib/data-fetching";
import {
  TDashboardBattery,
  TDashboardLastConnection,
  TDashboardStats,
} from "@/lib/type";
import { useQueries } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const DialogWithContent = dynamic(
  () => import("@/components/organisms/dialogs/dialog-with-content"),
);

type DashboardProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
  searchParams: {
    batteryThreshold: number;
    lastConnectionThreshold: number;
    lastConnectionThresholdUnit: "second" | "minute" | "hour" | "day" | "month";
  };
};

export default function Dashboard({ params, searchParams }: DashboardProps) {
  if (
    !searchParams.batteryThreshold ||
    !searchParams.lastConnectionThreshold ||
    !searchParams.lastConnectionThresholdUnit
  ) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/dashboard?batteryThreshold=20&lastConnectionThreshold=1&lastConnectionThresholdUnit=hour`,
    );
  }
  const results = useQueries({
    queries: [
      {
        queryKey: ["dashboard", params.deploymentId],
        queryFn: async () => {
          const { data }: { data: TDashboardStats } = await clientFetchData(
            `/phase/${params.deploymentId}/visualization/device`,
          );
          return data;
        },
        refetchInterval: 5000,
      },
      {
        queryKey: ["battery", params.deploymentId],
        queryFn: async () => {
          const { data }: { data: TDashboardBattery[] } = await clientFetchData(
            `/phase/${params.deploymentId}/visualization/battery`,
            [
              {
                key: "threshold",
                value: String(searchParams.batteryThreshold),
              },
            ],
          );
          return data;
        },
        refetchInterval: 5000,
      },
      {
        queryKey: ["lastConnection", params.deploymentId],
        queryFn: async () => {
          const { data }: { data: TDashboardLastConnection[] } =
            await clientFetchData(
              `/phase/${params.deploymentId}/visualization/lastConnection`,
              [
                {
                  key: "threshold",
                  value: String(searchParams.lastConnectionThreshold),
                },
                {
                  key: "range",
                  value: String(searchParams.lastConnectionThresholdUnit),
                },
              ],
            );
          return data;
        },
        refetchInterval: 5000,
      },
    ],
  });
  if (results.some((result) => result.isLoading)) {
    return (
      <MainContainer>
        <CardGrid>
          <CardSkeleton variant="metricNoIcon" />
          <CardSkeleton variant="metricNoIcon" />
          <CardSkeleton variant="metricNoIcon" />
        </CardGrid>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TableWrapper>
            <CardHeader>
              <CardHeaderTextContent>
                <Skeleton className="h-[2.4rem] w-64" />
                <Skeleton className="h-[1.6rem] w-full max-w-sm" />
              </CardHeaderTextContent>
              <CardHeaderActions>
                <Skeleton className="h-10 w-10" />
              </CardHeaderActions>
            </CardHeader>
            <TableSkeleton columnCount={2} rowCount={5} />
          </TableWrapper>
          <TableWrapper>
            <CardHeader>
              <CardHeaderTextContent>
                <Skeleton className="h-[2.4rem] w-64" />
                <Skeleton className="h-[1.6rem] w-full max-w-sm" />
              </CardHeaderTextContent>
              <CardHeaderActions>
                <Skeleton className="h-10 w-10" />
              </CardHeaderActions>
            </CardHeader>
            <TableSkeleton columnCount={2} rowCount={5} />
          </TableWrapper>
        </div>
      </MainContainer>
    );
  }
  return (
    <MainContainer>
      <CardGrid>
        <MetricCard
          type="simple"
          heading={"Active standalone"}
          metric={`${results[0]?.data?.standalone.active}/${results[0].data?.standalone.total}`}
        />
        <MetricCard
          type="simple"
          heading={"Active gateway"}
          metric={`${results[0]?.data?.gateway.active}/${results[0].data?.gateway.total}`}
        />
        <MetricCard
          type="simple"
          heading={"Active node"}
          metric={`${results[0]?.data?.node.active}/${results[0].data?.node.total}`}
        />
      </CardGrid>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TableWrapper className="h-fit">
          <CardHeader>
            <CardHeaderTextContent>
              <div className="flex flex-wrap items-center gap-2">
                <CardHeaderTitle>Low battery devices</CardHeaderTitle>
                <Badge variant={"error"} className="h-fit">
                  {results[1].data?.length} devices
                </Badge>
              </div>
              <CardHeaderDescription>
                These devices have a battery level below{" "}
                {searchParams.batteryThreshold}%
              </CardHeaderDescription>
            </CardHeaderTextContent>
            <CardHeaderActions>
              <DialogWithContent
                title="Edit battery threshold"
                content={
                  <BatteryThresholdForm
                    batteryThreshold={searchParams.batteryThreshold}
                  />
                }
              >
                <Button variant={"outline"} size={"icon"}>
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogWithContent>
            </CardHeaderActions>
          </CardHeader>
          <DataTable
            columns={dashboardBatteryColumns}
            data={results[1].data ?? []}
            searchByColumn="alias"
          />
        </TableWrapper>
        <TableWrapper className="h-fit">
          <CardHeader>
            <CardHeaderTextContent>
              <div className="flex flex-wrap items-center gap-2">
                <CardHeaderTitle>Possibly disconnected devices</CardHeaderTitle>
                <Badge variant={"error"} className="h-fit">
                  {results[2].data?.length} devices
                </Badge>
              </div>
              <CardHeaderDescription>
                These devices have not communicate within{" "}
                {searchParams.lastConnectionThreshold}{" "}
                {searchParams.lastConnectionThresholdUnit}
              </CardHeaderDescription>
            </CardHeaderTextContent>
            <CardHeaderActions>
              <DialogWithContent
                title="Edit last connection threshold"
                content={
                  <LastConnectionThresholdForm
                    lastConnectionThreshold={
                      searchParams.lastConnectionThreshold
                    }
                    lastConnectionThresholdUnit={
                      searchParams.lastConnectionThresholdUnit
                    }
                  />
                }
              >
                <Button variant={"outline"} size={"icon"}>
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogWithContent>
            </CardHeaderActions>
          </CardHeader>
          <DataTable
            columns={dashboardLastConnectionColumns}
            data={results[2].data ?? []}
            searchByColumn="alias"
          />
        </TableWrapper>
      </div>
    </MainContainer>
  );
}
