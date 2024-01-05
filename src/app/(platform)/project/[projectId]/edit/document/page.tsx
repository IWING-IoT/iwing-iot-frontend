import { MarkdownEditorForm } from "@/components/forms/markdown-editor-form";
import { DeniedEmptyState } from "@/components/molecules/denied-empty-state";
import Restricted from "@/components/providers/permission-provider/restricted";
import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";

type EditProjectDocumentProps = {
  params: {
    projectId: string;
  };
};

export default async function EditProjectDocument({
  params,
}: EditProjectDocumentProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  return (
    <Restricted to="edit" fallback={<DeniedEmptyState />}>
      <MarkdownEditorForm
        id={params.projectId}
        type="projectDocument"
        redirectTo={`/project/${params.projectId}/document`}
        markdownData={
          projectData.description
            ? projectData.description
            : "# Start editing here"
        }
        title={`${projectData.name} document`}
      />
    </Restricted>
  );
}
