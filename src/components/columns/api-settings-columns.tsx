"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/column-header";
import { TDeploymentApi } from "@/lib/type";
import { Pen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { EditApiFieldForm } from "../forms/edit-api-field-form";
import { DeleteActionDialog } from "../organisms/dialogs/delete-action-dialog";
import Restricted from "../providers/permission-provider/restricted";

export const apiSettingsColumns: ColumnDef<TDeploymentApi>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name = String(row.getValue("name"));
      return (
        <pre>
          <code className="rounded-sm bg-muted p-1 text-foreground">
            {name}
          </code>
        </pre>
      );
    },
  },
  {
    accessorKey: "dataType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data type" />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue("description")
        ? String(row.getValue("description"))
        : "-";
      return <p>{description}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Restricted to="edit">
          <div className="flex justify-end gap-1">
            <DialogWithContent
              title={`Edit ${data.name}`}
              content={<EditApiFieldForm fieldData={data} />}
            >
              <Button type="button" variant={"ghost"} size={"icon"}>
                <Pen className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DialogWithContent>
            <DeleteActionDialog
              title={`Delete ${data.name}`}
              description="This action can't be undone. All data associated with this field will be lost."
              action="deleteApiField"
              id={data.id}
            >
              <Button type="button" variant={"ghost"} size={"icon"}>
                <Trash2 className="h-5 w-5 text-destructive" />
              </Button>
            </DeleteActionDialog>
          </div>
        </Restricted>
      );
    },
  },
];
