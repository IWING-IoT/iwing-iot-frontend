import PermissionProvider from "@/components/providers/permission-provider/permission-provider";
import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";
import { permission } from "@/lib/utils";

type LayoutProps = {
  params: { projectId: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  let permissions;
  if (projectData.isArchived === true) {
    permissions = permission.project_archived;
  } else {
    permissions = permission[projectData.permission];
  }
  return (
    <PermissionProvider permissions={permissions}>
      {children}
    </PermissionProvider>
  );
}
