"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { CustomAvatar } from "../atoms/custom-avatar";
import { TCollaborators } from "@/lib/type";
import { CollaboratorsColumnsDropdown } from "../organisms/dropdowns/collaborators-columns-dropdown";

export const collaboratorsColumns: ColumnDef<TCollaborators>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return (
        <div className="flex w-max items-center gap-3">
          <CustomAvatar value={name} size={40} />
          <p className="text-base font-medium text-foreground">{name}</p>
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
    accessorKey: "permission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permission" />
    ),
    cell: ({ row }) => {
      const permission = String(row.getValue("permission")).replace("_", " ");
      return <p className="first-letter:uppercase">{permission}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      if (user.permission === "owner") return null;
      return (
        <div className="flex justify-end">
          <CollaboratorsColumnsDropdown userData={user} />
        </div>
      );
    },
  },
];
