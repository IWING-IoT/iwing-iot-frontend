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
import { DialogWithContent } from "../dialogs/dialog-with-content";
import { formatDate, onDialogOpenChange, onDropdownSelect } from "@/lib/utils";
import { TDeploymentDetails } from "@/lib/type";
import { PatchActionDialog } from "../dialogs/patch-action-dialog";
import Restricted from "@/components/providers/permission-provider/restricted";

type DeploymentDropdownProps = {
  deploymentData: TDeploymentDetails;
};

export function DeploymentDropdown({
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
              {deploymentData.description && (
                <p className="text-muted-foreground">
                  {deploymentData.description}
                </p>
              )}
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
          <DropdownMenuItem>
            <Pen className="h-4 w-4 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
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
          <DropdownMenuItem className="text-destructive data-[highlighted]:text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </Restricted>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
