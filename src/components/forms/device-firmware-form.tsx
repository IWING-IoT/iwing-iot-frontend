"use client";
import { TDeviceFirmwareDetails, TFirmware, TFirmwareType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/data-fetching";
import { Button } from "../ui/button";
import { Combobox } from "../organisms/combobox";
import { cn, firmwareType, generateEscEvent } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { DialogFooter } from "../ui/dialog";

type DeviceFirmwareFormProps =
  | {
      action: "assign";
      type: TFirmwareType;
      deviceFirmwareData?: never;
      firmwareData: TFirmware[];
    }
  | {
      action: "edit";
      type: TFirmwareType;
      deviceFirmwareData: TDeviceFirmwareDetails;
      firmwareData: TFirmware[];
    };

export function DeviceFirmwareForm({
  action,
  type,
  deviceFirmwareData,
  firmwareData,
}: DeviceFirmwareFormProps) {
  const firmwareList: { label: string; value: string }[] = firmwareData.map(
    (firmware) => ({
      label: firmware.name,
      value: firmware.id,
    }),
  );
  const formSchema = z.object({
    firmware: z.string().min(1),
    version: z.string().min(1),
    autoUpdate: z.boolean(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firmware: action === "edit" ? deviceFirmwareData.firmware.id : "",
      version: action === "edit" ? deviceFirmwareData.firmwareVersion.id : "",
      autoUpdate: action === "edit" ? deviceFirmwareData.autoUpdate : true,
    },
    mode: "onChange",
  });
  const firmware = form.watch("firmware");
  const { data: firmwareVersionData } = useQuery({
    queryKey: [firmware],
    queryFn: () => fetchData(`/firmware/${firmware}`),
    enabled: Boolean(firmware),
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("submit");
    console.log(data);
    generateEscEvent();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="firmware"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{firmwareType[type]}</FormLabel>
              <Combobox
                options={firmwareList}
                value={field.value}
                onSelect={(value) => form.setValue("firmware", value)}
                searchPlaceholder={`Search by ${firmwareType[
                  type
                ].toLowerCase()} name`}
                emptyPlaceholder={`No ${firmwareType[
                  type
                ].toLowerCase()} found`}
              >
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? firmwareList.find(
                          (firmware) => firmware.value === field.value,
                        )?.label
                      : `Select ${firmwareType[type].toLowerCase()}`}
                    <ChevronsUpDown className="h-5 w-5" />
                  </Button>
                </FormControl>
              </Combobox>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">
            {action === "assign" ? "Assign" : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
