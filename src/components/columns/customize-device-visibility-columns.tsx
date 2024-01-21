"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TDevicePath, TDevicePosition } from "@/lib/type";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export const customizeDeviceVisibilityColumns: ColumnDef<
  TDevicePosition | TDevicePath
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "alias",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alias" />
    ),
    cell: ({ row }) => {
      const alias = row.original.alias;
      return (
        <p className="w-max text-base font-medium text-foreground">{alias}</p>
      );
    },
  },
];
