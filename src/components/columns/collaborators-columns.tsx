"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { CustomAvatar } from "../atoms/custom-avatar";
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { Button } from "../ui/button";
import { Pen, Trash2 } from "lucide-react";
import { EditPermissionForm } from "../forms/edit-permission-form";
import { TCollaborators } from "@/lib/type";
import { DeleteActionDialog } from "../organisms/dialogs/delete-action-dialog";

export const collaboratorsColumns: ColumnDef<TCollaborators>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return (
        <div className="flex w-max items-center gap-3 text-base">
          <CustomAvatar value={name} size={40} />
          <p className="font-medium">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = String(row.getValue("email"));
      return <div className="text-muted-foreground">{email}</div>;
    },
  },
  {
    accessorKey: "permission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permission" />
    ),
    cell: ({ row }) => {
      const permission = String(row.getValue("permission")).replace("_", " ");
      return (
        <div className="text-muted-foreground first-letter:uppercase">
          {permission}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      if (user.permission === "owner") return null;
      return (
        <div className="flex justify-end gap-1">
          <DialogWithContent
            title={`Edit ${user.name}'s permission`}
            content={<EditPermissionForm collaboratorData={user} />}
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Pen className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DialogWithContent>
          <DeleteActionDialog
            title={`Remove ${user.name} from this project`}
            description={`${user.name} will no longer have access to this project. You can invite them again later.`}
            action="removeCollaborator"
            id={user.id}
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Trash2 className="h-5 w-5 text-destructive" />
            </Button>
          </DeleteActionDialog>
        </div>
      );
    },
  },
];
