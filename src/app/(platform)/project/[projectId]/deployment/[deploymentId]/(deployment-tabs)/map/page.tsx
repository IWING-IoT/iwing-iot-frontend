import { InteractiveMap } from "@/components/organisms/interactive-map";
import { MapSidebar } from "@/components/organisms/map-sidebar";
import { subtractDay } from "@/lib/utils";
import { redirect } from "next/navigation";

type MapProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
  searchParams: {
    mode?: "realtime" | "trace";
    startAt?: string;
    endAt?: string;
    id?: string;
  };
};

export default function Map({ params, searchParams }: MapProps) {
  const mode = searchParams?.mode;
  const startAt = searchParams?.startAt;
  const endAt = searchParams?.endAt;
  const id = searchParams?.id;

  if (!mode) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/map?mode=realtime`,
    );
  }

  if (mode === "trace" && !startAt && !endAt) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/map?mode=trace&startAt=${subtractDay(new Date(), 7).toISOString()}&endAt=${new Date().toISOString()}`,
    );
  }

  if (mode === "realtime" && (startAt || endAt)) {
    redirect(
      `/project/${params.projectId}/deployment/${params.deploymentId}/map?mode=realtime`,
    );
  }
  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
      <InteractiveMap
        deploymentId={params.deploymentId}
        mode={mode}
        startAt={startAt}
        endAt={endAt}
      />
      <MapSidebar
        deploymentId={params.deploymentId}
        mode={mode}
        startAt={startAt}
        endAt={endAt}
        id={id}
      />
    </div>
  );
}
