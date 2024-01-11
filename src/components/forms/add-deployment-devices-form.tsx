"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Column,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Form } from "../ui/form";
import { TDevices } from "@/lib/type";
import { DataTableColumnHeader } from "../data-table/column-header";

type AddDeploymentDevicesFormProps = {
  devicesData: TDevices[];
};

export function AddDeploymentDevicesForm({
  devicesData,
}: AddDeploymentDevicesFormProps) {
  const formSchema = z.object({
    devices: z.array(
      z.object({
        name: z.string().min(1),
        alias: z.string(),
      }),
    ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      devices: devicesData.map((device) => ({
        id: device.id,
        name: device.name,
        alias: "",
      })),
    },
    mode: "onChange",
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "devices",
  });

  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TDevices>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
  ];

  const table = useReactTable({
    data: devicesData,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      ></form>
    </Form>
  );
}
