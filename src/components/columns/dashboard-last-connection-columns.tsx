"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TDashboardLastConnection } from "@/lib/type";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const dashboardLastConnectionColumns: ColumnDef<TDashboardLastConnection>[] =
  [
    {
      accessorKey: "alias",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Device alias" />
      ),
      cell: ({ row }) => {
        const alias = row.original.alias;
        return <p className="text-base font-medium text-foreground">{alias}</p>;
      },
    },
    {
      accessorKey: "battery",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last connection" />
      ),
      cell: ({ row }) => {
        const lastConnection = row.original.lastConnection;
        return (
          <Badge variant={"success"}>
            {formatDate(lastConnection, "relative")}
          </Badge>
        );
      },
    },
  ];
