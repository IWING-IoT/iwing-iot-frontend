"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Button } from "../ui/button";
import { Pen, Trash2 } from "lucide-react";
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { AlertDialog } from "../organisms/dialogs/alert-dialog";
import { UserAccountForm } from "../forms/user-account-form";
import { CustomAvatar } from "../atoms/custom-avatar";
import { TUserAccountDetails } from "@/lib/type";

export const userAccountColumns: ColumnDef<
  Omit<TUserAccountDetails, "password">
>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex w-max items-center gap-3 text-base">
          <CustomAvatar value={user.name} size={40} />
          <p className="font-medium">{user.name}</p>
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
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize text-muted-foreground">
          {row.getValue("role")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-end gap-1">
          <DialogWithContent
            title={`Edit ${user.name}'s account`}
            content={<UserAccountForm type="edit" userData={user} />}
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Pen className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DialogWithContent>
          <AlertDialog
            variant="error"
            icon={<Trash2 />}
            title={`Delete ${user.name}'s account`}
            description={`${user.name} will no longer have access to this platform. This action can't be undone.`}
            submitButtonLabel="Delete"
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Trash2 className="h-5 w-5 text-destructive" />
            </Button>
          </AlertDialog>
        </div>
      );
    },
  },
];
