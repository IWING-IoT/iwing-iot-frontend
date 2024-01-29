"use client";

import { dashboardBatteryColumns } from "@/components/columns/dashboard-battery-columns";
import { dashboardLastConnectionColumns } from "@/components/columns/dashboard-last-connection-columns";
import { DataTable } from "@/components/data-table/data-table";
import {
  CardHeader,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { MetricCard } from "@/components/molecules/metric-card";
import { CardGrid } from "@/components/templates/card-grid";
import { MainContainer } from "@/components/templates/main-container";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Badge } from "@/components/ui/badge";
import { clientFetchData } from "@/lib/data-fetching";
import {
  TDashboardBattery,
  TDashboardLastConnection,
  TDashboardStats,
} from "@/lib/type";
import { useQueries } from "@tanstack/react-query";

type DashboardProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
  searchParams: {
    batteryThreshold?: number;
    lastConnectionThreshold?: number;
    lastConnectionThresholdUnit?:
      | "seconds"
      | "minute"
      | "hour"
      | "day"
      | "month";
  };
};

export default function Dashboard({ params, searchParams }: DashboardProps) {
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
            );
          return data;
        },
        refetchInterval: 5000,
      },
    ],
  });
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
        <TableWrapper>
          <CardHeader>
            <CardHeaderTextContent>
              <div className="flex flex-wrap items-center gap-2">
                <CardHeaderTitle className="w-max">
                  Low battery devices
                </CardHeaderTitle>
                <Badge variant={"error"} className="h-fit">
                  {results[1].data?.length} devices
                </Badge>
              </div>
            </CardHeaderTextContent>
          </CardHeader>
          <DataTable
            columns={dashboardBatteryColumns}
            data={results[1].data ?? []}
            searchByColumn="alias"
          />
        </TableWrapper>
        <TableWrapper>
          <CardHeader>
            <CardHeaderTextContent>
              <div className="flex flex-wrap items-center gap-2">
                <CardHeaderTitle className="w-max">
                  Possibly disconnected devices
                </CardHeaderTitle>
                <Badge variant={"error"} className="h-fit">
                  {results[1].data?.length} devices
                </Badge>
              </div>
            </CardHeaderTextContent>
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
