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
        <div className="flex items-center gap-2">
          <File className="h-5 w-5 text-muted-foreground" />
          <p className="text-base font-medium">{name}</p>
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
      return (
        <div className="flex justify-between">
          <p className="text-muted-foreground">
            {formatDate(lastUpdate, "relative")}
          </p>
          <ChevronRight className="text-muted-foreground" />
        </div>
      );
    },
  },
];
