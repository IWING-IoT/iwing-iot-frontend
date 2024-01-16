import Restricted from "@/components/providers/permission-provider/restricted";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftRight, MoreHorizontal, Pen, Trash2 } from "lucide-react";
import DialogWithContent from "../dialogs/dialog-with-content";
import { EditPermissionForm } from "@/components/forms/edit-permission-form";
import { DeleteActionDialog } from "../dialogs/delete-action-dialog";
import { TCollaborators } from "@/lib/type";
import { onDialogOpenChange, onDropdownSelect } from "@/lib/utils";
import { PatchActionDialog } from "../dialogs/patch-action-dialog";

type CollaboratorsColumnsDropdownProps = {
  userData: TCollaborators;
};

export function CollaboratorsColumnsDropdown({
  userData,
}: CollaboratorsColumnsDropdownProps) {
  return (
    <Restricted to="edit">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogWithContent
            title={`Edit ${userData.name}'s permission`}
            content={<EditPermissionForm collaboratorData={userData} />}
            className="h-fit"
            onOpenChange={onDialogOpenChange}
          >
            <DropdownMenuItem onSelect={onDropdownSelect}>
              <Pen className="h-5 w-5 text-muted-foreground" />
              Edit permission
            </DropdownMenuItem>
          </DialogWithContent>
          <Restricted to="transferOwnership">
            <PatchActionDialog
              variant="warning"
              icon={<ArrowLeftRight />}
              title={`Transfer ownership to ${userData.name}`}
              description="This action will grant full control to the selected collaborator, including the ability to edit, archive, or delete this project."
              action="transferOwnership"
              id={userData.id}
              onOpenChange={onDialogOpenChange}
            >
              <DropdownMenuItem onSelect={onDropdownSelect}>
                <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
                Transfer ownership
              </DropdownMenuItem>
            </PatchActionDialog>
          </Restricted>
          <DropdownMenuSeparator />
          <DeleteActionDialog
            title={`Remove ${userData.name} from this project`}
            description={`${userData.name} will no longer have access to this project. You can invite them again later.`}
            action="removeCollaborator"
            id={userData.id}
            onOpenChange={onDialogOpenChange}
          >
            <DropdownMenuItem
              className="text-destructive data-[highlighted]:text-destructive"
              onSelect={onDropdownSelect}
            >
              <Trash2 className="h-5 w-5" />
              Remove from project
            </DropdownMenuItem>
          </DeleteActionDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </Restricted>
  );
}
