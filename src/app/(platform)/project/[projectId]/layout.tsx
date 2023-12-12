import PermissionProvider from "@/components/providers/permission-provider/permission-provider";
import { fetchData } from "@/lib/data-fetching";
import { TPermission, TProjectDetails } from "@/lib/type";
import { permission } from "@/lib/utils";

type LayoutProps = {
  params: { projectId: string };
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  const { data: projectData }: { data: TProjectDetails } = await fetchData(
    `/project/${params.projectId}`,
  );
  return (
    <PermissionProvider
      permissions={permission[projectData.permission] as TPermission[]}
    >
      {children}
    </PermissionProvider>
  );
}