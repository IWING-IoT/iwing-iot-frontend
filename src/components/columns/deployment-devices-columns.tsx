"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TDeploymentDeviceDetails, TEntry } from "@/lib/type";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";
import { CopyableInput } from "../molecules/copyable-input";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export const deploymentDevicesColumns: ColumnDef<TDeploymentDeviceDetails>[] = [
  {
    accessorKey: "alias",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Device name" />
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
        <div className="flex w-max gap-1">
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
      <DataTableColumnHeader column={column} title="Status" />
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
      <DataTableColumnHeader column={column} title="Battery" />
    ),
    cell: ({ row }) => {
      const battery = row.original.battery;
      if (!battery) return <p>-</p>;
      return (
        <Badge variant={Number(battery) > 20 ? "success" : "error"}>
          {battery}%
        </Badge>
      );
    },
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Temperature" />
    ),
    cell: ({ row }) => {
      const temperature = row.original.temperature;
      if (!temperature) return <p>-</p>;
      return (
        <Badge variant={Number(temperature) <= 40 ? "success" : "error"}>
          {temperature} °C
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastCommunication",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last communicate" />
    ),
    cell: ({ row }) => {
      const lastCommunicate = row.original.lastCommunuication;
      if (!lastCommunicate) return <p>-</p>;
      return (
        <Badge variant={"gray"}>
          {formatDate(lastCommunicate, "relative")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "JWT",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JWT token" />
    ),
    cell: ({ row }) => {
      const JWT = row.original.JWT;
      if (!JWT) return <p>-</p>;
      return <CopyableInput className="min-w-[10rem]" value={JWT} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      );
    },
  },
];
