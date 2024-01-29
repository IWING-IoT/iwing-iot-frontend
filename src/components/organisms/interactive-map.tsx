"use client";
import dynamic from "next/dynamic";
import {
  ChevronDown,
  LandPlot,
  MapPin,
  MoreHorizontal,
  Route,
} from "lucide-react";
import { formatDate, subtractDay } from "@/lib/utils";
import { SearchParamsDropdown } from "./dropdowns/search-params-dropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { clientFetchData } from "@/lib/data-fetching";
import { TArea, TDevicePosition, TDevicePath, TCustomMarker } from "@/lib/type";
import { Skeleton } from "../ui/skeleton";
import { DateTimePickerDropdown } from "./dropdowns/date-time-picker-dropdown";
import {
  EmptyState,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "../molecules/empty-state";
import { EmptyIllustration } from "../atoms/illustrations/empty-illustration";
import { useAtom } from "jotai";
import {
  deviceVisibilityAtom,
  mapStateAtom,
  showDialogAtom,
} from "@/store/atoms";
import { LatLngTuple } from "leaflet";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { stringToColor } from "@/lib/utils";

const LeafletMap = dynamic(() => import("@/components/organisms/leaflet-map"), {
  ssr: false,
});

type InteractiveMapProps = {
  deploymentId: string;
  type: "realtime" | "trace";
  startAt: string | undefined;
  endAt: string | undefined;
  mode: "view" | "editMarker" | "editGeofencing" | undefined;
};

export function InteractiveMap({
  deploymentId,
  type,
  startAt,
  endAt,
  mode,
}: InteractiveMapProps) {
  const types = [
    { label: "Realtime", value: "realtime" },
    { label: "Trace", value: "trace" },
  ];
  const editOptions = [
    {
      label: "Edit custom marker",
      value: "editMarker",
      icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
    },
    {
      label: "Edit geofencing",
      value: "editGeofencing",
      icon: <LandPlot className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [visibleDevice, setVisibleDevice] = useAtom(deviceVisibilityAtom);

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
          const { data }: { data: TDevicePosition[] } = await clientFetchData(
            `/phase/${deploymentId}/map/position`,
          );
          if (data) {
            return data;
          }
        },
        refetchInterval: 5000,
        enabled: type === "realtime",
      },
      {
        queryKey: ["area", deploymentId],
        queryFn: async () => {
          const { data }: { data: TArea[] } = await clientFetchData(
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
          const { data }: { data: TDevicePath[] } = await clientFetchData(
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
        enabled: type === "trace",
      },
      {
        queryKey: ["customMarker", deploymentId],
        queryFn: async () => {
          const { data }: { data: TCustomMarker[] } = await clientFetchData(
            `/phase/${deploymentId}/map/mark`,
          );
          if (data) {
            return data;
          }
        },
      },
    ],
  });

  function onClickDevice(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set("id", id);
    replace(`${pathname}?${params.toString()}`);
  }

  function onClickExit() {
    const params = new URLSearchParams(searchParams);
    params.set("mode", "view");
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(
    () =>
      console.log(
        results[1].data?.filter((item) =>
          item.coordinates.every((item) => item[0] && item[1]),
        ),
      ),
    [results[1].data],
  );

  if (
    results[0].isLoading ||
    results[1].isLoading ||
    results[2].isLoading ||
    results[3].isLoading
  ) {
    return (
      <div className="relative h-full min-h-[32rem] overflow-hidden rounded-lg lg:col-span-2">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
    );
  }

  if (mode === "editGeofencing" && results[1].data) {
    return (
      <div className="relative h-full min-h-[32rem] overflow-hidden rounded-lg lg:col-span-2">
        <LeafletMap
          type="withLayerControl"
          action="editGeofencing"
          bounds={
            results[1].data?.filter((item) =>
              item.coordinates.every((item) => item[0] && item[1]),
            ).length > 0
              ? results[1].data
                  ?.filter((item) =>
                    item.coordinates.every((item) => item[0] && item[1]),
                  )
                  .flatMap((item) => item.coordinates)
              : results[0].data
                  ?.filter((item) => item.latitude && item.longitude)
                  .map((item) => [item.latitude, item.longitude]) ?? [[0, 0]]
          }
          editableLayer={{
            name: "Geofencing",
            checked: true,
            areas: results[1].data?.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              position: item.coordinates,
              color: stringToColor(item.id),
              type: "polygon",
              content: (
                <div className="flex max-w-40 flex-col font-sans">
                  <p className="text-base font-medium">{item.name}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              ),
            })),
          }}
          scrollWheelZoom
          deploymentId={deploymentId}
        />
        <Button
          variant={"outline"}
          className="absolute right-6 top-5"
          onClick={onClickExit}
        >
          Exit
        </Button>
      </div>
    );
  }

  if (mode === "editMarker" && results[3].data) {
    return (
      <div className="relative h-full min-h-[32rem] overflow-hidden rounded-lg lg:col-span-2">
        <LeafletMap
          type="withLayerControl"
          action="editMarker"
          bounds={
            results[3].data?.filter((item) => item.latitude && item.longitude)
              .length > 0
              ? results[3].data
                  ?.filter((item) => item.latitude && item.longitude)
                  .map((item) => [item.latitude, item.longitude])
              : results[0].data
                  ?.filter((item) => item.latitude && item.longitude)
                  .map((item) => [item.latitude, item.longitude]) ?? [[0, 0]]
          }
          editableLayer={{
            name: "Custom marker",
            checked: true,
            markers: results[3].data?.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              position: [item.latitude, item.longitude] as [number, number],
              content: (
                <div className="flex flex-col font-sans">
                  <p className="text-base font-medium">{item.name}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              ),
            })),
          }}
          scrollWheelZoom
          deploymentId={deploymentId}
        />
        <Button
          variant={"outline"}
          className="absolute right-6 top-5"
          onClick={onClickExit}
        >
          Exit
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[32rem] overflow-hidden rounded-lg lg:col-span-2">
      {type === "realtime" ? (
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
            action="view"
            bounds={
              results[0].data
                ?.filter((item) => item.latitude && item.longitude)
                .map((item) => [item.latitude, item.longitude]) ?? [[0, 0]]
            }
            layers={[
              {
                name: "Device marker",
                checked: true,
                markers: results[0].data
                  ?.filter(
                    (item) =>
                      visibleDevice[item.id] && item.latitude && item.longitude,
                  )
                  .map((item) => ({
                    id: item.id,
                    name: item.alias,
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
                        <p className="text-sm">
                          latitude : {item.latitude.toFixed(5)}
                        </p>
                        <p className="text-sm">
                          longitude : {item.longitude.toFixed(5)}
                        </p>
                        <p className="text-sm">
                          battery : {item.battery.toFixed(2)}%
                        </p>
                        <p className="text-sm">
                          temperature : {item.temperature.toFixed(2)}°C
                        </p>
                      </div>
                    ),
                    onClick: () => onClickDevice(item.id),
                  })),
              },
              {
                name: "Area",
                checked: true,
                areas: results[1].data?.map((item) => ({
                  id: item.id,
                  position: item.coordinates,
                  color: stringToColor(item.id),
                  type: "polygon",
                  content: (
                    <div className="flex max-w-40 flex-col font-sans">
                      <p className="text-base font-medium">{item.name}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  ),
                })),
              },
              {
                name: "Custom marker",
                checked: true,
                markers: results[3].data?.map((item) => ({
                  id: item.id,
                  name: item.name,
                  position: [item.latitude, item.longitude] as [number, number],
                  content: (
                    <div className="flex flex-col font-sans">
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
          action="view"
          bounds={
            results[2].data
              ?.filter((item) =>
                item.path.every((path) => path.latitude && path.longitude),
              )
              .flatMap((item) =>
                item.path.map(
                  (path) => [path.latitude, path.longitude] as LatLngTuple,
                ),
              ) ?? [[0, 0]]
          }
          layers={[
            {
              name: "Path",
              checked: true,
              vectors: results[2].data
                ?.filter(
                  (item) =>
                    visibleDevice[item.id] &&
                    item.path.every((path) => path.latitude && path.longitude),
                )
                .map((item) => ({
                  id: item.id,
                  position: item.path
                    .filter((item) => item.latitude && item.longitude)
                    .map((item) => [item.latitude, item.longitude]),
                  color: stringToColor(item.id),
                  type: "polyline",
                  content: (
                    <div className="flex flex-col font-sans">
                      <p className="text-base font-medium">{item.alias}</p>
                    </div>
                  ),
                  onClick: () => onClickDevice(item.id),
                })),
            },
            {
              name: "Area",
              checked: true,
              areas: results[1].data?.map((item) => ({
                id: item.id,
                position: item.coordinates,
                color: stringToColor(item.id),
                type: "polygon",
                content: (
                  <div className="flex max-w-40 flex-col font-sans">
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-sm">{item.description}</p>
                  </div>
                ),
              })),
            },
            {
              name: "Custom marker",
              checked: true,
              markers: results[3].data?.map((item) => ({
                id: item.id,
                name: item.name,
                position: [item.latitude, item.longitude] as [number, number],
                content: (
                  <div className="flex flex-col font-sans">
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
      {mode === "view" && (
        <div className="absolute right-6 top-5 flex gap-3">
          <SearchParamsDropdown
            options={types}
            paramsName="type"
            type="radio"
            triggerButton={
              <Button variant={"outline"} className="gap-2">
                {type === "realtime" ? (
                  <MapPin className="h-5 w-5" />
                ) : (
                  <Route className="h-5 w-5" />
                )}
                {types.find((option) => option.value === type)?.label}
                <ChevronDown className="h-5 w-5" />
              </Button>
            }
          />
          {type === "trace" && (
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
          <SearchParamsDropdown
            options={editOptions}
            paramsName="mode"
            type="default"
            triggerButton={
              <Button variant={"outline"} size={"icon"} className="gap-2">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
