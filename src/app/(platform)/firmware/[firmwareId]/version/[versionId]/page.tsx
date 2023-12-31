import { redirect } from "next/navigation";

type FirmwareVersionProps = {
  params: {
    firmwareId: string;
    versionId: string;
  };
};

export default function FirmwareVersion({ params }: FirmwareVersionProps) {
  redirect(`/firmware/${params.firmwareId}/version/${params.versionId}/code`);
}
