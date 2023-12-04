"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TCollaborators = {
  id: string;
  name: string;
  email: string;
  permission: string;
  permissionId: string;
};

export const collaboratorsColumns: ColumnDef<TCollaborators>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "permission",
    header: "Permission",
  },
];
