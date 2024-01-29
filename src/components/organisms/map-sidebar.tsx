"use client";
import { cn, formatDate, subtractDay } from "@/lib/utils";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderDescription,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "../molecules/card-header";
import { useAtom } from "jotai";
import { deviceVisibilityAtom, mapActionAtom } from "@/store/atoms";
import {
  TDeploymentDeviceDetails,
  TDevicePosition,
  TDevicePath,
} from "@/lib/type";
import { ScrollArea } from "../ui/scroll-area";
import { useQueries } from "@tanstack/react-query";
import { clientFetchData } from "@/lib/data-fetching";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Thermometer } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { DataTable } from "../data-table/data-table";
import { customizeDeviceVisibilityColumns } from "../columns/customize-device-visibility-columns";
import { FeatureIcon } from "../atoms/feature-icon";
import { Badge } from "../ui/badge";

type MapSidebarProps = {
  deploymentId: string;
  type: "realtime" | "trace";
  startAt: string | undefined;
  endAt: string | undefined;
  id: string | undefined;
};

export function MapSidebar({
  deploymentId,
  type,
  startAt,
  endAt,
  id,
}: MapSidebarProps) {
  const [position, setPosition] = useAtom(mapActionAtom);
  const [visibleDevice, setVisibleDevice] = useAtom(deviceVisibilityAtom);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

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
        enabled: type === "realtime",
      },
      {
        queryKey: [deploymentId, "path", startAt, endAt],
        queryFn: async () => {
          const { data }: { data: TDevicePath[] | undefined } =
            await clientFetchData(`/phase/${deploymentId}/map/path`, [
              {
                key: "startAt",
                value: startAt ?? subtractDay(new Date(), 7).toISOString(),
              },
              {
                key: "endAt",
                value: endAt ?? new Date().toISOString(),
              },
            ]);
          // console.log(data);
          if (data) {
            return data;
          }
        },
        refetchInterval: 5000,
        enabled: type === "trace",
      },
      // {
      //   queryKey: ["deviceId", id],
      //   queryFn: async () => {
      //     const { data }: { data: TDeploymentDeviceDetails | undefined } =
      //       await clientFetchData(`/devicePhase/${id}`);
      //     if (data) {
      //       return data;
      //     }
      //   },
      //   refetchInterval: 5000,
      //   enabled: Boolean(id),
      // },
    ],
  });

  function handleClickDevice(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set("id", id);
    replace(`${pathname}?${params.toString()}`);
    if (!visibleDevice[id]) {
      setVisibleDevice({ ...visibleDevice, [id]: true });
    }
  }
  function handleClickBack() {
    const params = new URLSearchParams(searchParams);
    params.delete("id");
    replace(`${pathname}?${params.toString()}`);
  }

  if (id) {
    // if (results[2].isLoading) {
    //   return <Skeleton className="rounded-lg" />;
    // }
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background">
        <CardHeader className="flex-grow-0 pl-3">
          <CardHeaderTextContent>
            <CardHeaderTitle className="flex items-center gap-2">
              <Button variant={"ghost"} size={"icon"} onClick={handleClickBack}>
                <ChevronLeft />
              </Button>
              {results[0].data?.find((item) => item.id === id)?.alias}
            </CardHeaderTitle>
            <div className="flex flex-wrap gap-2">
              {results[0].data
                ?.find((item) => item.id === id)
                ?.associate.map((item) => (
                  <Badge variant={"modern"}>{item.name}</Badge>
                ))}
            </div>
          </CardHeaderTextContent>
        </CardHeader>
        <ScrollArea>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Last communicate</p>
              <p className="font-medium tabular-nums">
                {results[0].data?.find((item) => item.id === id)?.lastConnection
                  ? formatDate(
                      results[0].data?.find((item) => item.id === id)
                        ?.lastConnection ?? "",
                      "relative",
                    )
                  : ""}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Latitude</p>
              <p className="font-medium tabular-nums">
                {results[0].data
                  ?.find((item) => item.id === id)
                  ?.latitude.toFixed(5)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Longitude</p>
              <p className="font-medium tabular-nums">
                {results[0].data
                  ?.find((item) => item.id === id)
                  ?.longitude.toFixed(5)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Battery</p>
              <p className="font-medium tabular-nums">
                {results[0].data
                  ?.find((item) => item.id === id)
                  ?.battery.toFixed(2)}
                %
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Temperature</p>
              <p className="font-medium tabular-nums">
                {results[0].data
                  ?.find((item) => item.id === id)
                  ?.temperature.toFixed(2)}
                °C
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  } else if (type === "realtime") {
    if (results[0].isLoading) {
      return <Skeleton className="rounded-lg" />;
    }
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background">
        <CardHeader className="flex-grow-0">
          <CardHeaderTextContent>
            <CardHeaderTitle>Devices</CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
        <DataTable
          columns={customizeDeviceVisibilityColumns}
          data={
            results[0].data?.filter(
              (item) => item.latitude && item.longitude,
            ) ?? []
          }
          searchByColumn="alias"
          rowSelection={visibleDevice}
          setRowSelection={setVisibleDevice}
          clickableRows
          onRowClick={(row) => {
            if ("latitude" in row && "longitude" in row) {
              setPosition({
                type: "setView",
                position: [row.latitude, row.longitude],
              });
            }
            handleClickDevice(row.id);
          }}
          highlightOnSelected={false}
          usePagination={false}
        />
      </div>
    );
  } else {
    if (results[1].isLoading) {
      return <Skeleton className="rounded-lg" />;
    }
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background">
        <CardHeader className="flex-grow-0">
          <CardHeaderTextContent>
            <CardHeaderTitle>Devices</CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
        <DataTable
          columns={customizeDeviceVisibilityColumns}
          data={
            results[1].data?.filter((item) =>
              item.path.every((path) => path.latitude && path.longitude),
            ) ?? []
          }
          searchByColumn="alias"
          rowSelection={visibleDevice}
          setRowSelection={setVisibleDevice}
          clickableRows
          onRowClick={(row) => {
            if ("path" in row) {
              setPosition({
                type: "setBounds",
                position: row.path.map((item) => [
                  item.latitude,
                  item.longitude,
                ]),
              });
            }
            handleClickDevice(row.id);
          }}
          highlightOnSelected={false}
          usePagination={false}
        />
      </div>
    );
  }
}
