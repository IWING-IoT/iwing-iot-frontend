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
      id={params.versionId}
      type="firmwareDocument"
      redirectTo={`/firmware/${params.firmwareId}/version/${params.versionId}/document`}
      markdownData={
        firmwareVersionData.markdown
          ? firmwareVersionData.markdown
          : "# Start editing here"
      }
      title={`${firmwareVersionData.name} document`}
    />
  );
}
