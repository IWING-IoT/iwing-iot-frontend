"use client";
import {
  TDeviceFirmwareDetails,
  TFirmware,
  TFirmwareDetails,
  TFirmwareType,
  TFirmwareVersion,
  THttpError,
} from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  clientFetchData,
  fetchData,
  patchData,
  postData,
} from "@/lib/data-fetching";
import { Button } from "../ui/button";
import { Combobox } from "../organisms/combobox";
import { cn, firmwareType, generateEscEvent } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { DialogFooter } from "../ui/dialog";
import { RadioGroup } from "../ui/radio-group";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DeviceFirmwareFormProps =
  | {
      action: "assign";
      type: TFirmwareType;
      deviceId: string;
      deviceFirmwareId?: never;
      deviceFirmwareData?: never;
      firmwareData: TFirmware[];
    }
  | {
      action: "edit";
      type: TFirmwareType;
      deviceId?: never;
      deviceFirmwareId: string;
      deviceFirmwareData: TDeviceFirmwareDetails | undefined;
      firmwareData: TFirmware[];
    };

export function DeviceFirmwareForm({
  action,
  type,
  deviceId,
  deviceFirmwareId,
  deviceFirmwareData,
  firmwareData,
}: DeviceFirmwareFormProps) {
  const router = useRouter();
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
      firmware: action === "edit" ? deviceFirmwareData?.firmware.id : "",
      version: action === "edit" ? deviceFirmwareData?.firmwareVersion.id : "",
      autoUpdate: action === "edit" ? deviceFirmwareData?.autoUpdate : false,
    },
    mode: "onChange",
  });
  const firmware = form.watch("firmware");
  const { data: versionList } = useQuery({
    queryKey: ["firmware", firmware],
    queryFn: async () => {
      const {
        data: firmwareVersionData,
      }: { data: TFirmwareDetails | undefined } = await clientFetchData(
        `/firmware/${firmware}`,
      );
      if (firmwareVersionData) {
        const versionList = firmwareVersionData.versions.map((version) => ({
          label: version.name,
          value: version.id,
        }));
        return versionList;
      }
      return [];
    },
    enabled: Boolean(firmware),
  });
  const assignFirmware = useMutation({
    mutationFn: (data: {
      type: TFirmwareType;
      id: string;
      autoUpdate: boolean;
    }) => postData(`/devicePhase/${deviceId}/firmware`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to assign firmware", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Firmware assigned successfully");
      router.refresh();
    },
  });
  const editFirmware = useMutation({
    mutationFn: (data: { id: string; autoUpdate: boolean }) =>
      patchData(`/deviceFirmware/${deviceFirmwareId}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.refresh();
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    if (action === "assign") {
      assignFirmware.mutate({
        type,
        id: data.version,
        autoUpdate: data.autoUpdate,
      });
    } else if (action === "edit") {
      editFirmware.mutate({
        id: data.version,
        autoUpdate: data.autoUpdate,
      });
    }
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
                drawerHeader={`Select ${firmwareType[type].toLowerCase()}`}
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
        {versionList ? (
          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Version</FormLabel>
                <Combobox
                  options={versionList}
                  value={field.value}
                  onSelect={(value) => form.setValue("version", value)}
                  searchPlaceholder={`Search by version name`}
                  emptyPlaceholder={`No versions found`}
                  drawerHeader={`Select version`}
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
                        ? versionList.find(
                            (version) => version.value === field.value,
                          )?.label ?? "Select version"
                        : "Select version"}
                      <ChevronsUpDown className="h-5 w-5" />
                    </Button>
                  </FormControl>
                </Combobox>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Version
            </p>
            <Button variant="outline" className="justify-between" disabled>
              Select version
              <ChevronsUpDown className="h-5 w-5" />
            </Button>
          </div>
        )}
        <FormField
          control={form.control}
          name="autoUpdate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-xs">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Enable auto-update</FormLabel>
                <FormDescription>
                  When there's a newer version of this firmware, it will be
                  updated automatically.
                </FormDescription>
              </div>
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
