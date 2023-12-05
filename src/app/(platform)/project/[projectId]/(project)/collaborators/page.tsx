import {
  TCollaborators,
  collaboratorsColumns,
} from "@/components/columns/collaborators-columns";
import { DataTable } from "@/components/data-table/data-table";
import { fetchData } from "@/lib/data-fetching";

type CollaboratorsProps = {
  params: {
    projectId: string;
  };
};

export default async function Collaborators({ params }: CollaboratorsProps) {
  const { data }: { data: TCollaborators[] } = await fetchData(
    `/project/${params.projectId}/collaborator`,
  );
  return <DataTable columns={collaboratorsColumns} data={data} />;
}
