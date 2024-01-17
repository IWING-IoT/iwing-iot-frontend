import { DeviceFirmwareForm } from "@/components/forms/device-firmware-form";
import { FirmwareCard } from "@/components/molecules/device-firmware-card";
import { DeleteActionDialog } from "@/components/organisms/dialogs/delete-action-dialog";
import Restricted from "@/components/providers/permission-provider/restricted";
import { CardGrid } from "@/components/templates/card-grid";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDeviceFirmware, TFirmware, TFirmwareType } from "@/lib/type";
import { firmwareType } from "@/lib/utils";
import { FilePlus, Pen, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

const DialogWithContent = dynamic(
  () => import("@/components/organisms/dialogs/dialog-with-content"),
  { ssr: false },
);

type FirmwareProps = {
  params: {
    projectId: string;
    deploymentId: string;
    deviceId: string;
  };
};

export default async function Firmware({ params }: FirmwareProps) {
  const firmwareTypes: TFirmwareType[] = ["source", "config", "binary"];
  const { data: deviceFirmwareData }: { data: TDeviceFirmware } =
    await fetchData(`/devicePhase/${params.deviceId}/firmware`);
  const { data: sourceCodeData }: { data: TFirmware[] } = await fetchData(
    `/firmware`,
    [{ key: "type", value: "source" }],
  );
  const { data: configData }: { data: TFirmware[] } = await fetchData(
    `/firmware`,
    [{ key: "type", value: "config" }],
  );
  const { data: binaryData }: { data: TFirmware[] } = await fetchData(
    `/firmware`,
    [{ key: "type", value: "binary" }],
  );
  const firmwareData = {
    source: sourceCodeData,
    config: configData,
    binary: binaryData,
  };
  return (
    <CardGrid>
      {firmwareTypes.map((type) => {
        if (deviceFirmwareData?.[type]) {
          return (
            <FirmwareCard
              key={type}
              type={type}
              actionType="edit"
              firmwareName={deviceFirmwareData?.[type]?.firmware.name ?? ""}
              firmwareId={deviceFirmwareData?.[type]?.firmware.id ?? ""}
              versionName={
                deviceFirmwareData?.[type]?.firmwareVersion.name ?? ""
              }
              versionId={deviceFirmwareData?.[type]?.firmwareVersion.id ?? ""}
              autoUpdate={deviceFirmwareData?.[type]?.autoUpdate ?? false}
              button={
                <Restricted to="edit">
                  <div className="flex flex-1 gap-3">
                    <DialogWithContent
                      title={`Edit ${firmwareType[type].toLowerCase()}`}
                      content={
                        <DeviceFirmwareForm
                          action="edit"
                          deviceFirmwareId={
                            deviceFirmwareData[type]?.id as string
                          }
                          type={type}
                          firmwareData={firmwareData[type]}
                          deviceFirmwareData={deviceFirmwareData[type]}
                        />
                      }
                    >
                      <Button variant={"outline"} className="flex-1">
                        <Pen className="mr-2 h-5 w-5" />
                        Edit
                      </Button>
                    </DialogWithContent>
                    <DeleteActionDialog
                      title={`Remove ${firmwareType[type].toLowerCase()}`}
                      description="We'll no longer keep track of this firmware. You can assign them again later."
                      action="removeDeviceFirmware"
                      id={deviceFirmwareData[type]?.id as string}
                    >
                      <Button variant={"outline"} size={"icon"}>
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </DeleteActionDialog>
                  </div>
                </Restricted>
              }
            />
          );
        } else {
          return (
            <FirmwareCard
              key={type}
              type={type}
              actionType="assign"
              button={
                <Restricted to="edit">
                  <DialogWithContent
                    title={`Assign ${firmwareType[type].toLowerCase()}`}
                    content={
                      <DeviceFirmwareForm
                        action="assign"
                        type={type}
                        deviceId={params.deviceId}
                        firmwareData={firmwareData[type]}
                      />
                    }
                  >
                    <Button variant={"outline"} className="flex-1">
                      <FilePlus className="mr-2 h-5 w-5" />
                      Assign
                    </Button>
                  </DialogWithContent>
                </Restricted>
              }
            />
          );
        }
      })}
    </CardGrid>
  );
}
