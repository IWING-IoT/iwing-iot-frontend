import PermissionProvider from "@/components/providers/permission-provider/permission-provider";
import { fetchData } from "@/lib/data-fetching";
import { TDeploymentDetails, TProjectDetails } from "@/lib/type";
import { permission } from "@/lib/utils";

type LayoutProps = {
  params: { projectId: string; deploymentId: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  // console.log("params", params);
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  const { data: deploymentData }: { data: TDeploymentDetails } =
    await fetchData(`/phase/${params.deploymentId}`);

  let permissions;
  if (projectData.isArchived === true) {
    permissions = permission.project_archived;
  } else if (deploymentData.isActive === false) {
    permissions = permission.deployment_finished;
  } else {
    permissions = permission[projectData.permission];
  }

  return (
    <PermissionProvider permissions={permissions}>
      {children}
    </PermissionProvider>
  );
}
