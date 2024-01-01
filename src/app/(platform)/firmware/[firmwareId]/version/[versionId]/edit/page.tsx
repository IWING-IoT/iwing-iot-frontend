import { RouterBackButton } from "@/components/atoms/router-back-button";
import { EditFirmwareVersionForm } from "@/components/forms/edit-firmware-version-form";
import { HeaderTitle } from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";
import { fetchData } from "@/lib/data-fetching";
import { TFirmwareVersionDetails } from "@/lib/type";

type EditFirmwareVersionProps = {
  params: {
    firmwareId: string;
    versionId: string;
  };
};

export default async function EditFirmwareVersion({
  params,
}: EditFirmwareVersionProps) {
  const { data: firmwareVersionData }: { data: TFirmwareVersionDetails } =
    await fetchData(`/firmwareVersion/${params.versionId}`);
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <RouterBackButton variant="link" className="p-0" label="Back" />
          <HeaderTitle>Add new firmware</HeaderTitle>
        </div>
        <EditFirmwareVersionForm
          firmwareId={params.firmwareId}
          versionId={params.versionId}
          firmwareVersionData={firmwareVersionData}
        />
      </MainContainer>
    </div>
  );
}
