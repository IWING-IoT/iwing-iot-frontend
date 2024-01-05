import { MarkdownEditorForm } from "@/components/forms/markdown-editor-form";
import { DeniedEmptyState } from "@/components/molecules/denied-empty-state";
import Restricted from "@/components/providers/permission-provider/restricted";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentDetails } from "@/lib/type";

type EditDeploymentDocumentProps = {
  params: {
    projectId: string;
    deploymentId: string;
  };
};

export default async function EditDeploymentDocument({
  params,
}: EditDeploymentDocumentProps) {
  const { data: deploymentData }: { data: TDeploymentDetails } =
    await fetchData(`/phase/${params.deploymentId}`);
  return (
    <Restricted to="edit" fallback={<DeniedEmptyState />}>
      <MarkdownEditorForm
        id={params.deploymentId}
        type="deploymentDocument"
        redirectTo={`/project/${params.projectId}/deployment/${params.deploymentId}/document`}
        markdownData={
          deploymentData.description
            ? deploymentData.description
            : "# Start editing here"
        }
        title={`${deploymentData.name} document`}
      />
    </Restricted>
  );
}
