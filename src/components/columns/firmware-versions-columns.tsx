"use client";
import { TFirmwareVersion } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { ChevronRight, Github } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const firmwareVersionsColumns: ColumnDef<TFirmwareVersion>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return (
        <p className="w-max text-base font-medium text-foreground">{name}</p>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = String(row.getValue("description"));
      if (!description) {
        return <p>-</p>;
      }
      return <p className="max-w-xs truncate">{description}</p>;
    },
  },
  {
    accessorKey: "gitUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Git commit" />
    ),
    cell: ({ row }) => {
      const gitUrl = String(row.getValue("gitUrl") || "");
      const commitHash = gitUrl.split("/").pop() || "";
      const shortCommitHash = commitHash.substring(0, 7);
      if (!gitUrl) {
        return <p>-</p>;
      }
      return (
        <Badge variant={"modern"}>
          <Github className="mr-1 h-3 w-3 text-foreground" />
          <span>{shortCommitHash}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastUpdate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated on" />
    ),
    cell: ({ row }) => {
      const lastUpdate = String(row.getValue("lastUpdate"));
      return (
        <div className="flex justify-between">
          <p className="min-w-max">{formatDate(lastUpdate, "relative")}</p>
          <ChevronRight />
        </div>
      );
    },
  },
];
