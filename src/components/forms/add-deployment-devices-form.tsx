"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { TDevices, THttpError } from "@/lib/type";
import { DataTableColumnHeader } from "../data-table/column-header";
import { Button } from "../ui/button";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { DataTable } from "../data-table/data-table";
import { Input } from "../ui/input";
import { TableWrapper } from "../templates/table-wrapper";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "../molecules/header";
import Link from "next/link";
import { MainContainer } from "../templates/main-container";
import {
  CardHeader,
  CardHeaderDescription,
  CardHeaderTextContent,
  CardHeaderTitle,
} from "../molecules/card-header";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AddDeploymentDevicesFormProps = {
  availableDevicesData: TDevices[];
  deploymentId: string;
  backHref: string;
};

export function AddDeploymentDevicesForm({
  availableDevicesData,
  deploymentId,
  backHref,
}: AddDeploymentDevicesFormProps) {
  const router = useRouter();
  const [availableDevices, setAvailableDevices] =
    useState<Omit<TDevices, "status">[]>(availableDevicesData);

  const formSchema = z.object({
    devices: z.array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        type: z.enum(["standalone", "gateway", "node"]),
        alias: z.string(),
      }),
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      devices: [],
    },
    mode: "onChange",
  });
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "devices", // unique name for your Field Array
  });

  const allDevicesColumns: ColumnDef<Omit<TDevices, "status">>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const name = row.original.name;
        return <p className="text-base font-medium text-foreground">{name}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const deviceData = row.original;
        return (
          <div className="flex justify-end">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                append({
                  id: deviceData.id,
                  name: deviceData.name,
                  type: deviceData.type,
                  alias: "",
                });
                setAvailableDevices((prev) =>
                  prev.filter((device) => device.id !== deviceData.id),
                );
              }}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        );
      },
    },
  ];

  const addedDevicesColumns: ColumnDef<Omit<TDevices, "status">>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const name = row.original.name;
        return <p className="text-base font-medium text-foreground">{name}</p>;
      },
    },
    {
      id: "alias",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Alias" />
      ),
      cell: ({ row }) => {
        return (
          <FormField
            control={form.control}
            name={`devices.${row.index}.alias`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Enter device alias" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const deviceData = row.original;
        return (
          <div className="flex justify-end">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                remove(row.index);
                setAvailableDevices((prev) =>
                  [...prev, deviceData].sort((a, b) =>
                    a.name.localeCompare(b.name),
                  ),
                );
              }}
            >
              <Minus className="h-5 w-5" />
            </Button>
          </div>
        );
      },
    },
  ];

  const addDevice = useMutation({
    mutationFn: (data: { id: string; alias: string }[]) =>
      postData(`/phase/${deploymentId}/device`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to add device", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Device added successfully");
      router.push(backHref);
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
    const { devices } = data;
    const devicesToAdd = devices.map((device) => ({
      id: device.id,
      alias: device.alias,
    }));
    console.log(devicesToAdd);
    addDevice.mutate(devicesToAdd);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header>
            <HeaderContent>
              <HeaderTitleAndSupporting>
                <Button variant={"link"} className="w-fit p-0" asChild>
                  <Link href={backHref}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to deployment
                  </Link>
                </Button>
                <HeaderTitle>Add devices</HeaderTitle>
              </HeaderTitleAndSupporting>
              <HeaderActions>
                <Button type="submit">Add to deployment</Button>
              </HeaderActions>
            </HeaderContent>
          </Header>
          <MainContainer className="grid grid-cols-2 gap-6">
            <TableWrapper>
              <CardHeader>
                <CardHeaderTextContent>
                  <CardHeaderTitle>Available devices</CardHeaderTitle>
                </CardHeaderTextContent>
              </CardHeader>
              <DataTable columns={allDevicesColumns} data={availableDevices} />
            </TableWrapper>
            <TableWrapper>
              <CardHeader>
                <CardHeaderTextContent>
                  <CardHeaderTitle>Devices to be added</CardHeaderTitle>
                </CardHeaderTextContent>
              </CardHeader>
              <DataTable columns={addedDevicesColumns} data={fields} />
            </TableWrapper>
          </MainContainer>
        </form>
      </Form>
    </>
  );
}
