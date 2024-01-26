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
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      clickable: false,
    },
  },
  {
    accessorKey: "alias",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Device alias" />
    ),
    cell: ({ row }) => {
      const alias = row.original.alias;
      return (
        <p className="w-max text-base font-medium text-foreground">{alias}</p>
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
