"use client";

import { TMessage } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import {
  BatteryFull,
  BatteryLow,
  ChevronRight,
  Thermometer,
  ThermometerSun,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";

export const messagesColumns: ColumnDef<TMessage>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return (
        <p className="min-w-max text-base font-medium text-foreground">
          {formatDate(createdAt, "default", true)}
        </p>
      );
    },
  },
  {
    accessorKey: "latitude",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Latitude" />
    ),
    cell: ({ row }) => {
      const latitude = row.original.latitude;
      return <p className="min-w-max">{latitude}</p>;
    },
  },
  {
    accessorKey: "longitude",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Longitude" />
    ),
    cell: ({ row }) => {
      const longitude = row.original.longitude;
      return <p className="min-w-max">{longitude}</p>;
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
          <p>{battery}%</p>
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
          <p>{temperature} °C</p>
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
