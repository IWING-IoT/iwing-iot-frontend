"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TDashboardBattery } from "@/lib/type";
import { Progress } from "../ui/progress";

export const dashboardBatteryColumns: ColumnDef<TDashboardBattery>[] = [
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
      <DataTableColumnHeader column={column} title="Battery" />
    ),
    cell: ({ row }) => {
      const battery = row.original.battery;
      return (
        <div className="flex items-center gap-2">
          <Progress value={battery} className="h-2 w-[60%]" />
          <p className="text-foreground">{battery.toFixed(2)}%</p>
        </div>
      );
    },
  },
];
