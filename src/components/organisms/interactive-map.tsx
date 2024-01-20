"use client";
import dynamic from "next/dynamic";
import { MapPin, Route } from "lucide-react";
import { formatDate, subtractDay } from "@/lib/utils";
import { SearchParamsDropdown } from "./dropdowns/search-params-dropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { clientFetchData } from "@/lib/data-fetching";
import {
  TArea,
  TDeploymentDeviceDetails,
  TDevicePosition,
  TPath,
} from "@/lib/type";
import { Skeleton } from "../ui/skeleton";
import { DateTimePickerDropdown } from "./dropdowns/date-time-picker-dropdown";
import { MapSidebar } from "./map-sidebar";
import {
  EmptyState,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "../molecules/empty-state";
import { EmptyIllustration } from "../atoms/illustrations/empty-illustration";

const LeafletMap = dynamic(() => import("@/components/organisms/leaflet-map"), {
  ssr: false,
});

type InteractiveMapProps = {
  deploymentId: string;
};

export function InteractiveMap({ deploymentId }: InteractiveMapProps) {
  const modes = [
    { label: "Realtime", value: "realtime" },
    { label: "Trace", value: "trace" },
  ];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode") || "realtime";
  const startAt = searchParams.get("startAt");
  const endAt = searchParams.get("endAt");
  function handleChangeDate(key: "startAt" | "endAt", date: Date) {
    const params = new URLSearchParams(searchParams);
    if (key === "startAt" && endAt) {
      if (new Date(endAt) < date) {
        params.set("endAt", date.toISOString());
      }
    }
    params.set(key, date.toISOString());
    replace(`${pathname}?${params.toString()}`);
  }
  const results = useQueries({
    queries: [
      {
        queryKey: [deploymentId, "realtime"],
        queryFn: async () => {
          const { data }: { data: TDevicePosition[] | undefined } =
            await clientFetchData(`/phase/${deploymentId}/map/position`);
          if (data) {
            return data;
          }
        },
        refetchInterval: 5000,
        enabled: mode === "realtime",
      },
      {
        queryKey: [deploymentId, "area"],
        queryFn: async () => {
          const { data }: { data: TArea[] | undefined } = await clientFetchData(
            `/phase/${deploymentId}/area`,
          );
          // console.log(data);
          if (data) {
            return data;
          }
        },
      },
      {
        queryKey: [deploymentId, "path", startAt, endAt],
        queryFn: async () => {
          const { data }: { data: TPath[] | undefined } = await clientFetchData(
            `/phase/${deploymentId}/map/path`,
            [
              {
                key: "startAt",
                value: startAt ?? subtractDay(new Date(), 7).toISOString(),
              },
              {
                key: "endAt",
                value: endAt ?? new Date().toISOString(),
              },
            ],
          );
          // console.log(data);
          if (data) {
            return data;
          }
        },
        refetchInterval: 5000,
        enabled: mode === "trace",
      },
    ],
  });

  return (
    <div className="relative h-full min-h-[32rem] overflow-hidden rounded-lg lg:col-span-2">
      {results[0].isLoading || results[1].isLoading ? (
        <Skeleton className="h-full w-full rounded-none" />
      ) : mode === "realtime" ? (
        results[0].data?.length === 0 ? (
          <EmptyState>
            <EmptyStateImage>
              <EmptyIllustration />
            </EmptyStateImage>
            <EmptyStateTextContent>
              <EmptyStateTitle>Realtime data is not available</EmptyStateTitle>
            </EmptyStateTextContent>
          </EmptyState>
        ) : (
          <LeafletMap
            type="withLayerControl"
            layers={[
              {
                name: "Device marker",
                checked: true,
                markers: results[0].data
                  ?.filter((item) => item.latitude && item.longitude)
                  .map((item) => ({
                    id: item.devicePhaseId,
                    position: [item.latitude, item.longitude] as [
                      number,
                      number,
                    ],
                    content: (
                      <div className="flex flex-col font-sans">
                        <p className="text-base font-medium">
                          {item.alias} • {item.type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(item.lastConnection, "relative")}
                        </p>
                        <p className="text-sm">latitude : {item.latitude}</p>
                        <p className="text-sm">longitude : {item.longitude}</p>
                        <p className="text-sm">battery : {item.battery}</p>
                        <p className="text-sm">
                          temperature : {item.temperature}
                        </p>
                      </div>
                    ),
                  })),
              },
              {
                name: "Area",
                checked: true,
                vectors: results[1].data?.map((item) => ({
                  id: item.id,
                  position: item.coordinates,
                  color: "green",
                  type: "polygon",
                  content: (
                    <div className="flex max-w-40 flex-col font-sans">
                      <p className="text-base font-medium">{item.name}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  ),
                })),
              },
            ]}
            scrollWheelZoom
          />
        )
      ) : results[2].isLoading ? (
        <Skeleton className="h-full w-full rounded-none" />
      ) : results[2].data?.length === 0 ? (
        <EmptyState>
          <EmptyStateImage>
            <EmptyIllustration />
          </EmptyStateImage>
          <EmptyStateTextContent>
            <EmptyStateTitle>Trace data is not available</EmptyStateTitle>
          </EmptyStateTextContent>
        </EmptyState>
      ) : (
        <LeafletMap
          type="withLayerControl"
          layers={[
            {
              name: "Path",
              checked: true,
              vectors: results[2].data?.map((item) => ({
                id: item.devicePhaseId,
                position: item.path
                  .filter((item) => item.latitude && item.longitude)
                  .map((item) => [item.latitude, item.longitude]),
                color: "blue",
                type: "polyline",
                content: (
                  <div className="flex flex-col font-sans">
                    <p className="text-base font-medium">{item.name}</p>
                  </div>
                ),
              })),
            },
            {
              name: "Area",
              checked: true,
              vectors: results[1].data?.map((item) => ({
                id: item.id,
                position: item.coordinates,
                color: "green",
                type: "polygon",
                content: (
                  <div className="flex max-w-40 flex-col font-sans">
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ),
              })),
            },
          ]}
          scrollWheelZoom
        />
      )}
      <div className="absolute right-6 top-5 flex gap-3">
        <SearchParamsDropdown
          options={modes}
          name="mode"
          icon={
            mode === "realtime" ? (
              <MapPin className="h-5 w-5" />
            ) : (
              <Route className="h-5 w-5" />
            )
          }
        />
        {mode === "trace" && (
          <div className="flex">
            <DateTimePickerDropdown
              className="rounded-r-none border-r-0"
              date={startAt ? new Date(startAt) : subtractDay(new Date(), 7)}
              setDate={(value) => handleChangeDate("startAt", value)}
            />
            <DateTimePickerDropdown
              className="rounded-l-none"
              date={endAt ? new Date(endAt) : new Date()}
              setDate={(value) => handleChangeDate("endAt", value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
