"use client";
import { DeleteActionDialog } from "@/components/organisms/dialogs/delete-action-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TCategoryDetails } from "@/lib/type";
import { onDialogOpenChange, onDropdownSelect } from "@/lib/utils";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

type CategoryDropdownProps = {
  projectId: string;
  categoryId: string;
  categoryData: TCategoryDetails;
};

export function CategoryDropdown({
  projectId,
  categoryId,
  categoryData,
}: CategoryDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="gap-2">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuItem asChild>
          <Link href={`/project/${projectId}/category/${categoryId}/edit`}>
            <Pen className="h-4 w-4 text-muted-foreground" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteActionDialog
          title={`Delete ${categoryData.name}`}
          description="This action cannot be undone. You will lose all data associated with this category."
          action="deleteCategory"
          id={categoryId}
          onOpenChange={onDialogOpenChange}
          redirectTo={`/project/${projectId}/attribute-data`}
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
