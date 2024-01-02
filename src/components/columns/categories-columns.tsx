"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TCategory } from "@/lib/type";
import { ChevronRight } from "lucide-react";

export const categoriesColumns: ColumnDef<TCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return (
        <p className="w-max text-base font-medium text-foreground">{name}</p>
      );
    },
  },
  {
    id: "drillIn",
    cell: () => {
      return (
        <div className="flex justify-end">
          <ChevronRight className="text-muted-foreground" />
        </div>
      );
    },
  },
];
