"use client";
import { ChartCard } from "@/components/molecules/chart-card";
import { MetricCard } from "@/components/molecules/metric-card";
import { CardSkeleton } from "@/components/skeleton/card-skeleton";
import { clientFetchData } from "@/lib/data-fetching";
import { TDeviceStats } from "@/lib/type";
import { useQueries } from "@tanstack/react-query";
import { Battery, Thermometer } from "lucide-react";
import { redirect } from "next/navigation";

type OverviewProps = {
  params: {
    projectId: string;
    deploymentId: string;
    deviceId: string;
  };
  searchParams: {
    batteryRange: "hour" | "day" | "week" | "month";
    temperatureRange: "hour" | "day" | "week" | "month";
  };
};

export default function Overview({ params, searchParams }: OverviewProps) {
  if (!searchParams.batteryRange || !searchParams.temperatureRange) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/device/${params.deviceId}/overview?batteryRange=hour&temperatureRange=hour`,
    );
  }
  const results = useQueries({
    queries: [
      {
        queryKey: ["battery", params.deviceId],
        queryFn: async () => {
          const { data }: { data: TDeviceStats } = await clientFetchData(
            `/devicePhase/${params.deviceId}/graph`,
            [
              { key: "type", value: "battery" },
              { key: "range", value: searchParams.batteryRange },
              { key: "point", value: "8" },
            ],
          );
          return data;
        },
        refetchInterval: 5000,
      },
      {
        queryKey: ["temperature", params.deviceId],
        queryFn: async () => {
          const { data }: { data: TDeviceStats } = await clientFetchData(
            `/devicePhase/${params.deviceId}/graph`,
            [
              { key: "type", value: "temperature" },
              { key: "range", value: searchParams.temperatureRange },
              { key: "point", value: "8" },
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="grid grid-cols-1 gap-6">
          <CardSkeleton variant="metric" />
          <CardSkeleton variant="chart" />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <CardSkeleton variant="metric" />
          <CardSkeleton variant="chart" />
        </div>
      </div>
    );
  }
  const options = [
    { label: "Last minute", value: "minute" },
    { label: "Last hour", value: "hour" },
    { label: "Last 24 hours", value: "day" },
    { label: "Last 7 days", value: "week" },
    { label: "Last 4 weeks", value: "month" },
  ];
  function formatDate(
    dateString: string,
    range: "minute" | "hour" | "day" | "week" | "month",
  ) {
    const date = new Date(dateString);
    if (range === "minute") {
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } else if (range === "hour") {
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (range === "day") {
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (range === "week") {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });
    } else if (range === "month") {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });
    } else {
      return "";
    }
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="grid grid-cols-1 gap-6">
        <MetricCard
          type="simple"
          heading="Current battery"
          metric={
            results[0].data?.current
              ? Number(results[0].data?.current?.toFixed(2)) + "%"
              : "N/A"
          }
          icon={<Battery />}
        />
        <ChartCard
          heading="Battery statistics"
          searchParamsName="batteryRange"
          searchParamsOptions={options}
          searchParamsValue={searchParams.batteryRange}
          xAxisDataKey="x"
          yAxisDataKey="Battery"
          yDomain={[0, 100]}
          data={results[0].data?.x
            ?.map((item, index) => {
              if (results[0].data?.y?.[index]) {
                return {
                  x: formatDate(item, searchParams.batteryRange),
                  Battery: Number(results[0].data?.y?.[index]).toFixed(2),
                };
              } else {
                return {
                  x: formatDate(item, searchParams.batteryRange),
                };
              }
            })
            .reverse()}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <MetricCard
          type="simple"
          heading="Current temperature"
          metric={
            results[1]?.data?.current
              ? Number(results[1]?.data?.current?.toFixed(2)) + "°C"
              : "N/A"
          }
          icon={<Thermometer />}
        />
        <ChartCard
          heading="Temperature statistics"
          searchParamsName="temperatureRange"
          searchParamsOptions={options}
          searchParamsValue={searchParams.temperatureRange}
          xAxisDataKey="x"
          yAxisDataKey="Temperature"
          data={results[1].data?.x
            ?.map((item, index) => {
              if (results[1].data?.y?.[index]) {
                return {
                  x: formatDate(item, searchParams.temperatureRange),
                  Temperature: Number(results[1].data?.y?.[index]).toFixed(2),
                };
              } else {
                return {
                  x: formatDate(item, searchParams.temperatureRange),
                };
              }
            })
            .reverse()}
        />
      </div>
    </div>
  );
}
