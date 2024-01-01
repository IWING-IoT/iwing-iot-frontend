"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteActionDialog } from "../dialogs/delete-action-dialog";
import { onDialogOpenChange, onDropdownSelect } from "@/lib/utils";

type FirmwareVersionDropdownProps = {
  firmwareId: string;
  versionId: string;
};

export function FirmwareVersionDropdown({
  firmwareId,
  versionId,
}: FirmwareVersionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/firmware/${firmwareId}/version/${versionId}/edit`}>
            <Pen className="h-4 w-4 text-muted-foreground" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteActionDialog
          title="Delete this version"
          description="Once this version is deleted, it can't be restored."
          action="deleteFirmwareVersion"
          id={versionId}
          onOpenChange={onDialogOpenChange}
          redirectTo={`/firmware/${firmwareId}`}
        >
          <DropdownMenuItem
            className="text-destructive data-[highlighted]:text-destructive"
            onSelect={onDropdownSelect}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DeleteActionDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
