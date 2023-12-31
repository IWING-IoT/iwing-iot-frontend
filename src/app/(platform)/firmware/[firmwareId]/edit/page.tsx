import { EditFirmwareForm } from "@/components/forms/edit-firmware-form";
import { HeaderTitle } from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TFirmwareDetails } from "@/lib/type";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type EditFirmwareProps = {
  params: {
    firmwareId: string;
  };
};

export default async function EditFirmware({ params }: EditFirmwareProps) {
  const { data: firmwareData }: { data: TFirmwareDetails } = await fetchData(
    `/firmware/${params.firmwareId}`,
  );
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <Button variant={"link"} className="p-0" asChild>
            <Link href={`/firmware/${params.firmwareId}`}>
              <ArrowLeft className="mr-1.5 h-5 w-5" />
              Back to firmware
            </Link>
          </Button>
          <HeaderTitle>Edit {firmwareData.name}</HeaderTitle>
        </div>
        <EditFirmwareForm
          firmwareId={params.firmwareId}
          firmwareData={firmwareData}
        />
      </MainContainer>
    </div>
  );
}
