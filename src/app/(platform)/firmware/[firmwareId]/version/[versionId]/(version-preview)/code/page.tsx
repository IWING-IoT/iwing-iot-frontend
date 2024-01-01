import { DiffViewer } from "@/components/atoms/diff-viewer";
import { VersionDescriptionCard } from "@/components/molecules/version-description-card";
import { fetchData, getFile } from "@/lib/data-fetching";
import { TFirmwareDetails, TFirmwareVersionDetails } from "@/lib/type";

type CodeProps = {
  params: {
    firmwareId: string;
    versionId: string;
  };
};

export default async function Code({ params }: CodeProps) {
  const language = {
    cpp: "cpp",
    py: "python",
    md: "markdown",
    bin: "binary",
  };
  const { data: firmwareVersionData }: { data: TFirmwareVersionDetails } =
    await fetchData(`/firmwareVersion/${params.versionId}`);
  const { data: firmwareData }: { data: TFirmwareDetails } = await fetchData(
    `/firmware/${params.firmwareId}`,
  );
  let oldCode;
  if (
    firmwareVersionData.id ===
    firmwareData.versions[firmwareData.versions.length - 1].id
  ) {
    oldCode = ""; // First version, no old code
  } else {
    const currentFirmwareIndex = firmwareData.versions.findIndex(
      (version) => version.id === firmwareVersionData.id,
    );
    const { data: oldFirmwareVersionData }: { data: TFirmwareVersionDetails } =
      await fetchData(
        `/firmwareVersion/${
          firmwareData.versions[currentFirmwareIndex + 1].id
        }`,
      );
    oldCode = await getFile(oldFirmwareVersionData.file);
  }
  const newCode: string = await getFile(firmwareVersionData.file);
  return (
    <div className="flex flex-1 flex-col gap-4">
      <VersionDescriptionCard firmwareVersionData={firmwareVersionData} />
      <DiffViewer
        oldCode={oldCode}
        newCode={newCode}
        language={language[firmwareVersionData.fileExtension]}
      />
    </div>
  );
}
