import { RouterBackButton } from "@/components/atoms/router-back-button";
import { EditProjectForm } from "@/components/forms/edit-project-form";
import { DeniedEmptyState } from "@/components/molecules/denied-empty-state";
import { HeaderTitle } from "@/components/molecules/header";
import Restricted from "@/components/providers/permission-provider/restricted";
import { MainContainer } from "@/components/templates/main-container";
import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";
type ProjectProps = {
  params: { projectId: string };
};

export default async function EditProject({ params }: ProjectProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );

  return (
    <Restricted to="edit" fallback={<DeniedEmptyState />}>
      <div className="flex flex-1 justify-center">
        <MainContainer className="flex max-w-xl flex-1 gap-5">
          <div>
            <RouterBackButton
              variant="link"
              className="p-0"
              label="Back to project"
            />
            <HeaderTitle>Edit {projectData.name}</HeaderTitle>
          </div>
          <EditProjectForm
            projectId={params.projectId}
            projectData={projectData}
          />
        </MainContainer>
      </div>
    </Restricted>
  );
}
