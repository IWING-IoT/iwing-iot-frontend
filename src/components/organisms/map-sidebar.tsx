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
import { CustomizeDeviceVisibilityDialog } from "./dialogs/customize-device-visibility-dialog";
import { useEffect } from "react";

type MapSidebarProps = {
  deploymentId: string;
  mode: "realtime" | "trace";
  startAt: string | undefined;
  endAt: string | undefined;
  id: string | undefined;
  searchQuery: string | undefined;
};

export function MapSidebar({
  deploymentId,
  mode,
  startAt,
  endAt,
  id,
  searchQuery,
}: MapSidebarProps) {
  const [position, setPosition] = useAtom(mapActionAtom);
  const [deviceVisibility, setDeviceVisibility] = useAtom(deviceVisibilityAtom);
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
          <CardHeaderActions>
            <CustomizeDeviceVisibilityDialog data={results[0].data} />
          </CardHeaderActions>
        </CardHeader>
        <div className="p-4">
          <Search placeholder="Search by device alias" />
        </div>
        <ScrollArea>
          {results[0].data
            ?.filter((item) => {
              if (!deviceVisibility.includes(item.id)) {
                return false;
              } else if (searchQuery) {
                return item.alias
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              } else {
                return true;
              }
            })
            .map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer flex-col border-t p-6 hover:bg-accent"
                onClick={() => {
                  setPosition({
                    type: "flyTo",
                    position: [item.latitude, item.longitude],
                  });
                  handleClickDevice(item.id);
                }}
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{item.alias}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(item.lastConnection, "relative")}
                  </p>
                </div>
              </div>
            ))}
        </ScrollArea>
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
          <CardHeaderActions>
            <CustomizeDeviceVisibilityDialog data={results[1].data} />
          </CardHeaderActions>
        </CardHeader>
        <Search
          className="rounded-none border-none"
          placeholder="Search by device alias"
        />
        <ScrollArea>
          {results[1].data
            ?.filter(
              (item) =>
                deviceVisibility.includes(item.alias) && item.path.length > 1,
            )
            .map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer flex-col border-t p-6 hover:bg-accent"
                onClick={() => {
                  setPosition({
                    type: "flyToBounds",
                    position: item.path.map((item) => [
                      item.latitude,
                      item.longitude,
                    ]),
                  });
                  handleClickDevice(item.id);
                }}
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{item.alias}</p>
                </div>
              </div>
            ))}
        </ScrollArea>
      </div>
    );
  }
}
