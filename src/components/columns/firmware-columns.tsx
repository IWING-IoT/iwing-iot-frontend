"use client";
import { TFirmware } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { ChevronRight, File } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const firmwareColumns: ColumnDef<TFirmware>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return (
        <div className="flex min-w-max items-center gap-2">
          <File className="h-5 w-5" />
          <p className="text-base font-medium text-foreground">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "lastUpdate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last update" />
    ),
    cell: ({ row }) => {
      const lastUpdate = String(row.getValue("lastUpdate"));
      return <p className="min-w-max">{formatDate(lastUpdate, "relative")}</p>;
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
