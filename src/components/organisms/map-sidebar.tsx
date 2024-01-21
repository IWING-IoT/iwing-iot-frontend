"use client";
import { cn, formatDate, subtractDay } from "@/lib/utils";
import {
  CardHeader,
  CardHeaderActions,
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
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Search } from "../atoms/search";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table/data-table";
import { customizeDeviceVisibilityColumns } from "../columns/customize-device-visibility-columns";

type MapSidebarProps = {
  deploymentId: string;
  mode: "realtime" | "trace";
  startAt: string | undefined;
  endAt: string | undefined;
  id: string | undefined;
};

export function MapSidebar({
  deploymentId,
  mode,
  startAt,
  endAt,
  id,
}: MapSidebarProps) {
  const [position, setPosition] = useAtom(mapActionAtom);
  const [deviceVisibility, setDeviceVisibility] = useAtom(deviceVisibilityAtom);
  const initialRowSelection = deviceVisibility.reduce(
    (acc, curr) => ({ ...acc, [curr]: true }),
    {},
  );
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    initialRowSelection,
  );
  useEffect(() => {
    // console.log(rowSelection);
    const selectedDevices = Object.keys(rowSelection).filter(
      (key) => rowSelection[key],
    );
    setDeviceVisibility(selectedDevices);
  }, [rowSelection]);

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
        enabled: mode === "realtime",
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
        enabled: mode === "trace",
      },
      {
        queryKey: ["deviceId", id],
        queryFn: async () => {
          const { data }: { data: TDeploymentDeviceDetails | undefined } =
            await clientFetchData(`/devicePhase/${id}`);
          if (data) {
            return data;
          }
        },
        refetchInterval: 5000,
        enabled: Boolean(id),
      },
    ],
  });
  function handleClickDevice(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set("id", id);
    replace(`${pathname}?${params.toString()}`);
  }
  function handleClickBack() {
    const params = new URLSearchParams(searchParams);
    params.delete("id");
    replace(`${pathname}?${params.toString()}`);
  }
  if (id) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background">
        <CardHeader className="flex-grow-0 pl-3">
          <CardHeaderTextContent>
            <CardHeaderTitle className="flex items-center gap-2">
              <Button variant={"ghost"} size={"icon"} onClick={handleClickBack}>
                <ChevronLeft />
              </Button>
              {results[2].isLoading ? (
                <Skeleton className="h-full w-40" />
              ) : (
                results[2].data?.alias
              )}
            </CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
        <ScrollArea></ScrollArea>
      </div>
    );
  } else if (mode === "realtime") {
    if (results[0].isLoading) {
      return <Skeleton className="rounded-lg" />;
    }
    return (
      <div className="flex h-full flex-col rounded-lg border bg-background">
        <CardHeader className="flex-grow-0">
          <CardHeaderTextContent>
            <CardHeaderTitle>Devices</CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
        <DataTable
          columns={customizeDeviceVisibilityColumns}
          data={results[0].data ?? []}
          searchByColumn="alias"
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          clickableRows
          onRowClick={(row) => {
            if ("latitude" in row && "longitude" in row) {
              setPosition({
                type: "flyTo",
                position: [row.latitude, row.longitude],
              });
              handleClickDevice(row.id);
            }
          }}
          highlightOnSelected={false}
        />
      </div>
    );
  } else {
    if (results[1].isLoading) {
      return <Skeleton className="rounded-lg" />;
    }
    return (
      <div className="flex h-full flex-col rounded-lg border bg-background">
        <CardHeader className="flex-grow-0">
          <CardHeaderTextContent>
            <CardHeaderTitle>Devices</CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
        <DataTable
          columns={customizeDeviceVisibilityColumns}
          data={results[1].data ?? []}
          searchByColumn="alias"
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          clickableRows
          onRowClick={(row) => {
            if ("path" in row) {
              setPosition({
                type: "flyToBounds",
                position: row.path.map((item) => [
                  item.latitude,
                  item.longitude,
                ]),
              });
            }
            handleClickDevice(row.id);
          }}
          highlightOnSelected={false}
        />
      </div>
    );
  }
}
