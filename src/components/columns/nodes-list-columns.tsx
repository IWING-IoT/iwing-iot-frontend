"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TDeploymentDeviceDetails } from "@/lib/type";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";
import {
  BatteryFull,
  BatteryLow,
  ChevronRight,
  MessageSquare,
  Thermometer,
  ThermometerSun,
} from "lucide-react";

export const nodesListColumns: ColumnDef<
  Omit<TDeploymentDeviceDetails, "jwt">
>[] = [
  {
    accessorKey: "alias",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Device alias"
        enableToggleColumns
      />
    ),
    cell: ({ row }) => {
      const alias = row.original.alias;
      const name = row.original.name;
      if (!alias)
        return <p className="w-max font-medium text-foreground">{name}</p>;
      return (
        <div className="flex w-max flex-col">
          <p className="font-medium text-foreground">{alias}</p>
          <p>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "associate",
    header: () => <p className="w-max">Associate with</p>,
    cell: ({ row }) => {
      const associate = row.original.associate;
      return (
        <div className="flex w-max gap-1 text-foreground">
          {associate.length !== 0
            ? associate.map((item) => (
                <Badge key={item.id} variant={"modern"}>
                  {item.name}
                </Badge>
              ))
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        enableToggleColumns
      />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className="capitalize"
          variant={status === "active" ? "success" : "gray"}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "battery",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Battery"
        enableToggleColumns
      />
    ),
    cell: ({ row }) => {
      const battery = row.original.battery;
      if (!battery) return <p>-</p>;
      return (
        <Badge variant={Number(battery) > 20 ? "success" : "error"}>
          {Number(battery) > 20 ? (
            <BatteryFull className="mr-1 h-3 w-3" />
          ) : (
            <BatteryLow className="mr-1 h-3 w-3" />
          )}
          <p>{battery.toFixed(2)}%</p>
        </Badge>
      );
    },
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Temperature"
        enableToggleColumns
      />
    ),
    cell: ({ row }) => {
      const temperature = row.original.temperature;
      if (!temperature) return <p>-</p>;
      return (
        <Badge variant={Number(temperature) <= 40 ? "success" : "error"}>
          {Number(temperature) <= 40 ? (
            <Thermometer className="mr-1 h-3 w-3" />
          ) : (
            <ThermometerSun className="mr-1 h-3 w-3" />
          )}
          <p>{temperature.toFixed(2)} °C</p>
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastCommunication",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last communicate"
        enableToggleColumns
      />
    ),
    cell: ({ row }) => {
      const lastCommunicate = row.original.lastCommunuication;
      if (!lastCommunicate) return <p>-</p>;
      return (
        <Badge variant={"gray"}>
          <MessageSquare className="mr-1 h-3 w-3" />
          <p>{formatDate(lastCommunicate, "relative")}</p>
        </Badge>
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
