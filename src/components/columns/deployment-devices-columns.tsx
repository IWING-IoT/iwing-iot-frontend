"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TDeploymentDeviceDetails } from "@/lib/type";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";
import { CopyableInput } from "../molecules/copyable-input";
import {
  BatteryFull,
  BatteryLow,
  MessageSquare,
  Thermometer,
  ThermometerSun,
} from "lucide-react";
import { DeploymentDevicesDropdown } from "../organisms/dropdowns/deployment-devices-dropdown";

export const deploymentDevicesColumns: ColumnDef<TDeploymentDeviceDetails>[] = [
  {
    accessorKey: "alias",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Device name"
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
    accessorKey: "jwt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="JWT token"
        enableToggleColumns
      />
    ),
    cell: ({ row }) => {
      const jwt = row.original.jwt;
      if (!jwt) return <p>-</p>;
      return <CopyableInput className="min-w-[10rem]" value={jwt} />;
    },
    meta: {
      clickable: false,
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <DeploymentDevicesDropdown type="inTable" deploymentDeviceData={data} />
      );
    },
    meta: {
      clickable: false,
    },
  },
];
