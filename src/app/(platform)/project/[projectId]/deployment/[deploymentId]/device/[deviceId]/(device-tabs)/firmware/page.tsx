import { DeviceFirmwareForm } from "@/components/forms/device-firmware-form";
import { FirmwareCard } from "@/components/molecules/device-firmware-card";
import Restricted from "@/components/providers/permission-provider/restricted";
import { CardGrid } from "@/components/templates/card-grid";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TDeviceFirmware, TFirmware, TFirmwareType } from "@/lib/type";
import { firmwareType } from "@/lib/utils";
import { FilePlus, Pen } from "lucide-react";
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
              versionName={
                deviceFirmwareData?.[type]?.firmwareVersion.name ?? ""
              }
              autoUpdate={deviceFirmwareData?.[type]?.autoUpdate ?? false}
              button={
                <Restricted to="edit">
                  <DialogWithContent title={`Edit`} content={<div>Hello</div>}>
                    <Button variant={"outline"} className="flex-1">
                      <Pen className="mr-2 h-5 w-5" />
                      Edit
                    </Button>
                  </DialogWithContent>
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
                    title={`Assign ${firmwareType[type]}`}
                    content={
                      <DeviceFirmwareForm
                        action="assign"
                        type={type}
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
