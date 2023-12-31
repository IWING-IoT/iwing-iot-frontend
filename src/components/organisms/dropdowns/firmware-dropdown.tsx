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
import { TFirmwareDetails } from "@/lib/type";

type FirmwareDropdownProps = {
  firmwareId: string;
  firmwareData: TFirmwareDetails;
};

export function FirmwareDropdown({
  firmwareId,
  firmwareData,
}: FirmwareDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/firmware/${firmwareId}/edit`}>
            <Pen className="h-4 w-4 text-muted-foreground" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteActionDialog
          title="Delete this firmware"
          description="Once this firmware is deleted, it can't be restored."
          action="deleteFirmware"
          id={firmwareId}
          onOpenChange={onDialogOpenChange}
          redirectTo={`/firmware/${firmwareData.type}`}
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
