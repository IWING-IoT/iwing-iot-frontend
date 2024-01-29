"use client";

import { TDevices } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Badge } from "../ui/badge";
import { DevicesColumnsDropdown } from "../organisms/dropdowns/devices-columns-dropdown";
import Link from "next/link";

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
      if (row.original.canAccess) {
        const projectId = row.original.projectId;
        const deploymentId = row.original.phaseId;
        return (
          <div className="w-max">
            <Link
              href={`/project/${projectId}/deployment/${deploymentId}/devices`}
            >
              <Badge variant={variant} className="hover:underline">
                {status}
              </Badge>
            </Link>
          </div>
        );
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
