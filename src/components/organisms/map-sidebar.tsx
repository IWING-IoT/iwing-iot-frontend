"use client";
import { cn, formatDate, subtractDay } from "@/lib/utils";
import {
  CardHeader,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "../molecules/card-header";
import { useAtom } from "jotai";
import { mapActionAtom } from "@/store/atoms";
import { TDeploymentDeviceDetails, TDevicePosition, TPath } from "@/lib/type";
import { ScrollArea } from "../ui/scroll-area";
import { useQueries } from "@tanstack/react-query";
import { clientFetchData } from "@/lib/data-fetching";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "../atoms/search";
import { Skeleton } from "../ui/skeleton";

type MapSidebarProps = {
  deploymentId: string;
};

export function MapSidebar({ deploymentId }: MapSidebarProps) {
  const [position, setPosition] = useAtom(mapActionAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode") || "realtime";
  const startAt = searchParams.get("startAt");
  const endAt = searchParams.get("endAt");
  const id = searchParams.get("id");
  const searchQuery = searchParams.get("searchQuery");
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
            <CardHeaderTitle>All devices</CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
        <Search
          className="rounded-none border-none"
          placeholder="Search by device alias"
        />
        <ScrollArea>
          {results[0].data
            ?.filter((item) => {
              if (searchQuery) {
                return item.alias
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              } else {
                return true;
              }
            })
            .map((item) => (
              <div
                key={item.devicePhaseId}
                className="flex cursor-pointer flex-col border-t p-6 hover:bg-accent"
                onClick={() => {
                  setPosition({
                    type: "flyTo",
                    position: [item.latitude, item.longitude],
                  });
                  handleClickDevice(item.devicePhaseId);
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
            <CardHeaderTitle>All devices</CardHeaderTitle>
          </CardHeaderTextContent>
        </CardHeader>
        <Search
          className="rounded-none border-none"
          placeholder="Search by device alias"
        />
        <ScrollArea>
          {results[1].data
            ?.filter((item) => item.path.length > 1)
            .map((item) => (
              <div
                key={item.devicePhaseId}
                className="flex cursor-pointer flex-col border-t p-6 hover:bg-accent"
                onClick={() => {
                  setPosition({
                    type: "flyToBounds",
                    position: item.path.map((item) => [
                      item.latitude,
                      item.longitude,
                    ]),
                  });
                  handleClickDevice(item.devicePhaseId);
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
