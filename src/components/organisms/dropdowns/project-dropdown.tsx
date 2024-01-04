"use client";
import { DeleteActionDialog } from "@/components/organisms/dialogs/delete-action-dialog";
import { DialogWithContent } from "@/components/organisms/dialogs/dialog-with-content";
import { PatchActionDialog } from "@/components/organisms/dialogs/patch-action-dialog";
import Restricted from "@/components/providers/permission-provider/restricted";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TProjectDetails } from "@/lib/type";
import { formatDate, onDialogOpenChange, onDropdownSelect } from "@/lib/utils";
import {
  Archive,
  Calendar,
  Info,
  MapPin,
  MoreHorizontal,
  Pen,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";

type ProjectMoreDropdownProps = {
  projectId: string;
  projectData: TProjectDetails;
};

export function ProjectDropdown({
  projectId,
  projectData,
}: ProjectMoreDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DialogWithContent
          title={projectData.name}
          content={
            <div className="flex flex-col gap-4">
              {projectData.description && (
                <p className="text-muted-foreground">
                  {projectData.description}
                </p>
              )}
              <div className="flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <p>{projectData.ownerName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <p>{projectData.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <p>
                    {projectData.endedAt
                      ? `${formatDate(projectData.startedAt)} - ${formatDate(
                          projectData.endedAt,
                        )}`
                      : `${formatDate(projectData.startedAt)}`}
                  </p>
                </div>
              </div>
            </div>
          }
          onOpenChange={onDialogOpenChange}
        >
          <DropdownMenuItem onSelect={onDropdownSelect}>
            <Info className="h-4 w-4 text-muted-foreground" />
            Project info
          </DropdownMenuItem>
        </DialogWithContent>
        <Restricted to="edit">
          <DropdownMenuItem asChild>
            <Link href={"edit"}>
              <Pen className="h-4 w-4 text-muted-foreground" />
              Edit
            </Link>
          </DropdownMenuItem>
        </Restricted>
        <Restricted to="delete">
          <DropdownMenuSeparator />
          <PatchActionDialog
            variant="warning"
            icon={<Archive />}
            title="Archive this project"
            description="This action can't be undone. You will no longer be able to make any changes to this project."
            action="archiveProject"
            id={projectId}
            onOpenChange={onDialogOpenChange}
          >
            <DropdownMenuItem onSelect={onDropdownSelect}>
              <Archive className="h-4 w-4 text-muted-foreground" />
              Archive
            </DropdownMenuItem>
          </PatchActionDialog>
          <DeleteActionDialog
            title="Delete this project"
            description="Are you sure you want to delete this project? This action is irreversible and will result in permanent loss of all associated data."
            action="deleteProject"
            id={projectId}
            onOpenChange={onDialogOpenChange}
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
