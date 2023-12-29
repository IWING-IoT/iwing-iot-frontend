"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { EditUserAccountForm } from "../forms/edit-user-account-form";
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
        <div className="flex w-max items-center gap-3 text-base text-foreground">
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
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = String(row.getValue("role"));
      return <p className="capitalize">{role}</p>;
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
            content={<EditUserAccountForm userData={user} />}
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Pen className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DialogWithContent>
        </div>
      );
    },
  },
];
