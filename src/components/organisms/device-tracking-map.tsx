"use client";
import { useAtom } from "jotai";
import { InteractiveMap } from "./interactive-map";
import { MapSidebar } from "./map-sidebar";
import { deviceVisibilityAtom } from "@/store/atoms";
import { TDevicePosition } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";
import { clientFetchData } from "@/lib/data-fetching";
import { useEffect } from "react";
import { EmptyIllustration } from "../atoms/illustrations/empty-illustration";
import {
  EmptyState,
  EmptyStateImage,
  EmptyStateTextContent,
  EmptyStateTitle,
} from "../molecules/empty-state";

type DeviceTrackingMapProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
  searchParams: {
    type?: "realtime" | "trace";
    startAt?: string;
    endAt?: string;
    id?: string;
    mode?: "view" | "editMarker" | "editGeofencing";
  };
};

export default function DeviceTrackingMap({
  params,
  searchParams,
}: DeviceTrackingMapProps) {
  const type = searchParams?.type;
  const startAt = searchParams?.startAt;
  const endAt = searchParams?.endAt;
  const id = searchParams?.id;

  const [visibleDevice, setVisibleDevice] = useAtom(deviceVisibilityAtom);

  const { data: devicePosition, isSuccess } = useQuery({
    queryKey: [params.deploymentId, "realtime"],
    queryFn: async () => {
      const { data }: { data: TDevicePosition[] } = await clientFetchData(
        `/phase/${params.deploymentId}/map/position`,
      );
      return data;
    },
  });

  useEffect(() => {
    // console.log("devicePosition", devicePosition);
    if (devicePosition) {
      setVisibleDevice(
        devicePosition.reduce(
          (acc, cur) => {
            acc[cur.id] = true;
            return acc;
          },
          {} as Record<string, boolean>,
        ),
      );
    }
  }, [isSuccess]);

  if (devicePosition?.length === 0) {
    return (
      <EmptyState>
        <EmptyStateImage>
          <EmptyIllustration />
        </EmptyStateImage>
        <EmptyStateTextContent>
          <EmptyStateTitle>Map data is not available</EmptyStateTitle>
        </EmptyStateTextContent>
      </EmptyState>
    );
  }
  return (
    <div className="grid h-full grid-cols-1 gap-6 xl:grid-cols-3">
      <InteractiveMap
        deploymentId={params.deploymentId}
        mode={searchParams.mode}
        type={type ?? "realtime"}
        startAt={startAt}
        endAt={endAt}
      />
      <MapSidebar
        deploymentId={params.deploymentId}
        type={type ?? "realtime"}
        startAt={startAt}
        endAt={endAt}
        id={id}
      />
    </div>
  );
}
