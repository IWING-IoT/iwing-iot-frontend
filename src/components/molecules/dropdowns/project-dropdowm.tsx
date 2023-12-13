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
import { formatDate } from "@/lib/utils";
import {
  Archive,
  Calendar,
  ChevronDown,
  Info,
  MapPin,
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
  // deal with radix ui's bug
  const onOpenChange = (open: boolean) => {
    if (open === false) {
      setTimeout(() => {
        const escEvent = new KeyboardEvent("keydown", {
          key: "Escape",
        });
        document.dispatchEvent(escEvent);
      }, 200);
    }
  };
  const onSelect = (e: Event) => {
    e.preventDefault();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DialogWithContent
          title={projectData.name}
          content={
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground">
                {projectData.description ?? "No description"}
              </p>
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
                  <p>{formatDate(projectData.startedAt)}</p>
                </div>
              </div>
            </div>
          }
          onOpenChange={onOpenChange}
        >
          <DropdownMenuItem onSelect={onSelect}>
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
            description="You will no longer be able to make any changes to this project."
            action="archiveProject"
            id={projectId}
            onOpenChange={onOpenChange}
          >
            <DropdownMenuItem onSelect={onSelect}>
              <Archive className="h-4 w-4 text-muted-foreground" />
              Archive
            </DropdownMenuItem>
          </PatchActionDialog>
          <DeleteActionDialog
            title="Delete this project"
            description="Are you sure you want to delete this project? This action is irreversible and will result in permanent loss of all associated data."
            action="deleteProject"
            id={projectId}
            onOpenChange={onOpenChange}
          >
            <DropdownMenuItem
              className="text-destructive data-[highlighted]:text-destructive"
              onSelect={onSelect}
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
