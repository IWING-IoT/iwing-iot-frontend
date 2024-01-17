import { AddDeploymentDevicesForm } from "@/components/forms/add-deployment-devices-form";
import { DeniedEmptyState } from "@/components/molecules/denied-empty-state";
import Restricted from "@/components/providers/permission-provider/restricted";
import { fetchData } from "@/lib/data-fetching";
import { TDevices } from "@/lib/type";

type AddDeviceProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
};

export default async function AddDevice({ params }: AddDeviceProps) {
  const { data: devicesData }: { data: TDevices[] } = await fetchData(
    "/device",
    [
      { key: "type", value: "all" },
      { key: "status", value: "available" },
    ],
  );
  return (
    <Restricted to="edit" fallback={<DeniedEmptyState />}>
      <AddDeploymentDevicesForm
        availableDevicesData={devicesData}
        deploymentId={params.deploymentId}
        backHref={`/project/${params.projectId}/deployment/${params.deploymentId}/devices`}
      />
    </Restricted>
  );
}
