import { collaboratorsColumns } from "@/components/columns/collaborators-columns";
import { DataTable } from "@/components/data-table/data-table";
import { InviteCollaboratorsForm } from "@/components/forms/invite-collaborators-form";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderDescription,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "@/components/molecules/card-header";
import { DialogWithContent } from "@/components/organisms/dialogs/dialog-with-content";
import Restricted from "@/components/providers/permission-provider/restricted";
import { TableWrapper } from "@/components/templates/table-wrapper";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/data-fetching";
import { TCollaborators } from "@/lib/type";
import { UserPlus } from "lucide-react";

type CollaboratorsProps = {
  params: {
    projectId: string;
  };
};

export default async function Collaborators({ params }: CollaboratorsProps) {
  const { data }: { data: TCollaborators[] } = await fetchData(
    `/project/${params.projectId}/collaborator`,
  );
  return (
    <TableWrapper>
      <CardHeader>
        <CardHeaderTextContent>
          <CardHeaderTitle>Collaborators</CardHeaderTitle>
          <CardHeaderDescription>
            View and manage all collaborators involved in this project.
          </CardHeaderDescription>
        </CardHeaderTextContent>
        <Restricted to="edit">
          <CardHeaderActions>
            <DialogWithContent
              content={<InviteCollaboratorsForm projectId={params.projectId} />}
              title="Invite collaborators"
            >
              <Button>
                <UserPlus className="mr-1.5 h-5 w-5" />
                Invite collaborators
              </Button>
            </DialogWithContent>
          </CardHeaderActions>
        </Restricted>
      </CardHeader>
      <DataTable columns={collaboratorsColumns} data={data} />
    </TableWrapper>
  );
}
