import { MainContainer } from "@/components/templates/main-container";
import { subtractDay } from "@/lib/utils";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const DeviceTrackingMap = dynamic(
  () => import("@/components/organisms/device-tracking-map"),
  { ssr: false },
);

type MapProps = {
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

export default function Map({ params, searchParams }: MapProps) {
  const type = searchParams?.type;
  const startAt = searchParams?.startAt;
  const endAt = searchParams?.endAt;

  if (!type) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/map?type=realtime&mode=view`,
    );
  }

  if (type === "trace" && !startAt && !endAt) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/map?type=trace&mode=view&startAt=${subtractDay(new Date(), 7).toISOString()}&endAt=${new Date().toISOString()}`,
    );
  }

  if (type === "realtime" && (startAt || endAt)) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/map?type=realtime&mode=view`,
    );
  }

  return (
    <MainContainer className="h-full overflow-hidden">
      <DeviceTrackingMap params={params} searchParams={searchParams} />
    </MainContainer>
  );
}
