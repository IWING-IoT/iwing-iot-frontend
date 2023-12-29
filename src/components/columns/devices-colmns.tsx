"use client";

import { TDevices } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Badge } from "../ui/badge";
import {
  AlertCircle,
  MinusCircle,
  Pen,
  PlayCircle,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { EditDeviceForm } from "../forms/edit-device-form";
import { DeleteActionDialog } from "../organisms/dialogs/delete-action-dialog";
import { AlertDialog } from "../organisms/dialogs/alert-dialog";
import { PatchActionDialog } from "../organisms/dialogs/patch-action-dialog";

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
        <div className="flex justify-end gap-1">
          <DialogWithContent
            title={`Edit ${deviceData.name}`}
            content={<EditDeviceForm deviceData={deviceData} />}
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Pen className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DialogWithContent>
          {deviceData.status === "Available" ||
          deviceData.status === "Unavailable" ? (
            <PatchActionDialog
              variant={
                deviceData.status !== "Unavailable" ? "warning" : "success"
              }
              icon={
                deviceData.status !== "Unavailable" ? (
                  <MinusCircle />
                ) : (
                  <PlayCircle />
                )
              }
              action={
                deviceData.status !== "Unavailable"
                  ? "disableDevice"
                  : "enableDevice"
              }
              title={`Mark ${deviceData.name} as ${
                deviceData.status !== "Unavailable"
                  ? "unavailable"
                  : "available"
              }`}
              description={
                deviceData.status !== "Unavailable"
                  ? "The data associated with this device will remain, but you won't be able to use it in any project."
                  : "You will now be able to use this device in any project."
              }
              id={deviceData.id}
            >
              <Button variant={"ghost"} size={"icon"}>
                {deviceData.status !== "Unavailable" ? (
                  <MinusCircle className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <PlayCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </PatchActionDialog>
          ) : (
            <AlertDialog
              variant="warning"
              icon={<AlertCircle />}
              title={`${
                deviceData.name
              } is currently ${deviceData.status.toLowerCase()}`}
              description="This device must be in an inactive state before it can be marked as unavailable."
              action={false}
            >
              <Button variant={"ghost"} size={"icon"}>
                <MinusCircle className="h-5 w-5 text-muted-foreground" />
              </Button>
            </AlertDialog>
          )}
          <DeleteActionDialog
            title={`Delete ${deviceData.name}`}
            description={
              "This action can't be undone. You will lose all data associated with this device."
            }
            action="deleteDevice"
            id={deviceData.id}
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Trash2 className="h-5 w-5 text-destructive" />
            </Button>
          </DeleteActionDialog>
        </div>
      );
    },
  },
];
