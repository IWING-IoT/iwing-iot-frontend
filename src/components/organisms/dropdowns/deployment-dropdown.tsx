"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  Calendar,
  Check,
  Info,
  MoreHorizontal,
  Pen,
  Trash2,
  User,
} from "lucide-react";
import DialogWithContent from "../dialogs/dialog-with-content";
import { formatDate, onDialogOpenChange, onDropdownSelect } from "@/lib/utils";
import { TDeploymentDetails } from "@/lib/type";
import { PatchActionDialog } from "../dialogs/patch-action-dialog";
import Restricted from "@/components/providers/permission-provider/restricted";
import { DeleteActionDialog } from "../dialogs/delete-action-dialog";
import { DeploymentForm } from "@/components/forms/deployment-form";

type DeploymentDropdownProps = {
  projectId: string;
  deploymentData: TDeploymentDetails;
};

export function DeploymentDropdown({
  projectId,
  deploymentData,
}: DeploymentDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DialogWithContent
          title={deploymentData.name}
          content={
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <p>{deploymentData.ownerName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <p>
                    {deploymentData.endedAt
                      ? `${formatDate(deploymentData.startedAt)} - ${formatDate(
                          deploymentData.endedAt,
                        )}`
                      : `${formatDate(deploymentData.startedAt)}`}
                  </p>
                </div>
              </div>
            </div>
          }
          onOpenChange={onDialogOpenChange}
        >
          <DropdownMenuItem onSelect={onDropdownSelect}>
            <Info className="h-4 w-4 text-muted-foreground" />
            Deployment info
          </DropdownMenuItem>
        </DialogWithContent>
        <Restricted to="edit">
          <DialogWithContent
            title={`Edit ${deploymentData.name}`}
            content={
              <DeploymentForm type="edit" deploymentData={deploymentData} />
            }
            onOpenChange={onDialogOpenChange}
          >
            <DropdownMenuItem onSelect={onDropdownSelect}>
              <Pen className="h-4 w-4 text-muted-foreground" />
              Edit
            </DropdownMenuItem>
          </DialogWithContent>
          <DropdownMenuSeparator />
          <PatchActionDialog
            variant="warning"
            icon={<AlertCircle />}
            title={`Mark ${deploymentData.name} as finished`}
            description="This action can't be undone. You will no longer be able to make any changes to this deployment."
            action="markDeploymentAsFinished"
            id={deploymentData.id}
            onOpenChange={onDialogOpenChange}
          >
            <DropdownMenuItem onSelect={onDropdownSelect}>
              <Check className="h-4 w-4 text-muted-foreground" />
              Mark as finished
            </DropdownMenuItem>
          </PatchActionDialog>
          <DeleteActionDialog
            title={`Delete ${deploymentData.name}`}
            description="This action can't be undone. This will result in permanent loss of all associated data."
            action="deleteDeployment"
            id={deploymentData.id}
            onOpenChange={onDialogOpenChange}
            redirectTo={`/project/${projectId}/deployments`}
          >
            <DropdownMenuItem
              className="text-destructive data-[highlighted]:text-destructive"
              onSelect={onDropdownSelect}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DeleteActionDialog>
        </Restricted>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
