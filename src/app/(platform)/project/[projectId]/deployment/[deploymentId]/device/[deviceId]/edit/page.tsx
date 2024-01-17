import { EditDeploymentDeviceForm } from "@/components/forms/edit-deployment-device-form";
import { DeniedEmptyState } from "@/components/molecules/denied-empty-state";
import Restricted from "@/components/providers/permission-provider/restricted";
import { MainContainer } from "@/components/templates/main-container";
import { fetchData } from "@/lib/data-fetching";
import { TAllEntryInProject, TDeploymentDeviceDetails } from "@/lib/type";
import { HeaderTitle } from "@/components/molecules/header";
import { RouterBackButton } from "@/components/atoms/router-back-button";

type EditProps = {
  params: {
    projectId: string;
    deploymentId: string;
    deviceId: string;
  };
};

export default async function Edit({ params }: EditProps) {
  const { data: deviceData }: { data: TDeploymentDeviceDetails } =
    await fetchData(`/devicePhase/${params.deviceId}`);
  const { data: allEntryInProjectData }: { data: TAllEntryInProject[] } =
    await fetchData(`/category/${params.projectId}/allEntry`);
  return (
    <Restricted to="edit" fallback={<DeniedEmptyState />}>
      <div className="flex flex-1 justify-center">
        <MainContainer className="flex max-w-xl flex-1 gap-5">
          <div>
            <RouterBackButton
              variant="link"
              className="p-0"
              label="Back to device"
            />
            <HeaderTitle>Edit {deviceData.alias}</HeaderTitle>
          </div>
          <EditDeploymentDeviceForm
            deviceData={deviceData}
            allEntryInProject={allEntryInProjectData}
          />
        </MainContainer>
      </div>
    </Restricted>
  );
}
