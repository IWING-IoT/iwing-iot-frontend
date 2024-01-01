import { MarkdownEditorForm } from "@/components/forms/markdown-editor-form";
import { fetchData } from "@/lib/data-fetching";
import { TFirmwareVersionDetails } from "@/lib/type";

type EditFirmwareVersionDocumentProps = {
  params: {
    firmwareId: string;
    versionId: string;
  };
};

export default async function EditFirmwareVersionDocument({
  params,
}: EditFirmwareVersionDocumentProps) {
  const { data: firmwareVersionData }: { data: TFirmwareVersionDetails } =
    await fetchData(`/firmwareVersion/${params.versionId}`);
  return (
    <MarkdownEditorForm
      firmwareId={params.firmwareId}
      versionId={params.versionId}
      markdownData={firmwareVersionData.markdown ?? ""}
      title={`${firmwareVersionData.name} document`}
    />
  );
}
