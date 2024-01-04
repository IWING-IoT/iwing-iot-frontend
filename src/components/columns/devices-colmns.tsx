"use client";

import { TDevices } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Badge } from "../ui/badge";
import { DevicesColumnsDropdown } from "../organisms/dropdowns/devices-columns-dropdown";

export const devicesColumns: ColumnDef<TDevices>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return <p className="text-base font-medium text-foreground">{name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = String(row.getValue("status"));
      let variant: "success" | "warning" | "gray";
      if (status === "Available") {
        variant = "success";
      } else if (status === "Unavailable") {
        variant = "gray";
      } else {
        variant = "warning";
      }
      return (
        <div className="w-max">
          <Badge variant={variant}>{status}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deviceData = row.original;

      return (
        <div className="flex justify-end">
          <DevicesColumnsDropdown deviceData={deviceData} />
        </div>
      );
    },
  },
];
