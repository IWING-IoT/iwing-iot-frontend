"use client";

import { TDevices } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Badge } from "../ui/badge";
import { MinusCircle, Pen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { EditDeviceForm } from "../forms/edit-device-form";
import { DeleteActionDialog } from "../organisms/dialogs/delete-action-dialog";
import { AlertDialog } from "../organisms/dialogs/alert-dialog";

export const devicesColumns: ColumnDef<TDevices>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return <div className="text-base font-medium">{name}</div>;
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
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deviceData = row.original;

      return (
        <div className="flex justify-end gap-1">
          <DialogWithContent
            title={`Edit device`}
            content={<EditDeviceForm deviceData={deviceData} />}
          >
            <Button type="button" variant={"ghost"} size={"icon"}>
              <Pen className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DialogWithContent>
          <AlertDialog
            variant="warning"
            icon={<MinusCircle />}
            title={`Mark ${deviceData.name} as unavailable`}
            description={
              "The data associated with this device will remain, but you won't be able to use it in any project."
            }
            submitButtonLabel="Disable"
          >
            <Button variant={"ghost"} size={"icon"}>
              <MinusCircle className="h-5 w-5 text-muted-foreground" />
            </Button>
          </AlertDialog>
          {/* <DeleteActionDialog
            title={`Delete ${deviceData.name}`}
            description={
              "This action can't be undone. You will lose all data associated with this device."
            }
            // action="removeCollaborator"
            // id={"123"}
          > */}
          <Button type="button" variant={"ghost"} size={"icon"}>
            <Trash2 className="h-5 w-5 text-destructive" />
          </Button>
          {/* </DeleteActionDialog> */}
        </div>
      );
    },
  },
];
