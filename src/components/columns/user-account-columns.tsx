"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TUserAccount = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export const userAccountColumns: ColumnDef<TUserAccount>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
