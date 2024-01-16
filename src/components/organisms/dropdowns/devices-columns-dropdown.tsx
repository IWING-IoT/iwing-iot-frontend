"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  MinusCircle,
  MoreHorizontal,
  Pen,
  PlayCircle,
  Trash2,
} from "lucide-react";
import DialogWithContent from "../dialogs/dialog-with-content";
import { EditDeviceForm } from "@/components/forms/edit-device-form";
import { TDevices, THttpError } from "@/lib/type";
import { PatchActionDialog } from "../dialogs/patch-action-dialog";
import { AlertDialog } from "../dialogs/alert-dialog";
import { DeleteActionDialog } from "../dialogs/delete-action-dialog";
import { useMutation } from "@tanstack/react-query";
import { patchData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { onDialogOpenChange, onDropdownSelect } from "@/lib/utils";

type DevicesColumnsDropdownProps = {
  deviceData: TDevices;
};

export function DevicesColumnsDropdown({
  deviceData,
}: DevicesColumnsDropdownProps) {
  const router = useRouter();
  const enableDevice = useMutation({
    mutationFn: () =>
      patchData(`/device/${deviceData.id}/disable`, { disable: false }),
    onError: (error: THttpError) => {
      toast.error("Unable to mark as available", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Device marked as available");
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DialogWithContent
          title={`Edit ${deviceData.name}`}
          content={<EditDeviceForm deviceData={deviceData} />}
          onOpenChange={onDialogOpenChange}
        >
          <DropdownMenuItem onSelect={onDropdownSelect}>
            <Pen className="h-5 w-5 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
        </DialogWithContent>
        {deviceData.status === "Available" ||
        deviceData.status === "Unavailable" ? (
          <>
            {deviceData.status === "Available" ? (
              <PatchActionDialog
                variant={"warning"}
                icon={<MinusCircle />}
                action={"disableDevice"}
                title={`Mark ${deviceData.name} as unavailable`}
                description="The data associated with this device will remain, but you won't be able to use it in any project."
                id={deviceData.id}
                onOpenChange={onDialogOpenChange}
              >
                <DropdownMenuItem onSelect={onDropdownSelect}>
                  <MinusCircle className="h-5 w-5 text-muted-foreground" />
                  Mark as unavailable
                </DropdownMenuItem>
              </PatchActionDialog>
            ) : (
              <DropdownMenuItem onSelect={() => enableDevice.mutate()}>
                <PlayCircle className="h-5 w-5 text-muted-foreground" />
                Mark as available
              </DropdownMenuItem>
            )}
          </>
        ) : (
          <AlertDialog
            variant="warning"
            icon={<AlertCircle />}
            title={`${
              deviceData.name
            } is currently ${deviceData.status.toLowerCase()}`}
            description="This device must be in an inactive state before it can be marked as unavailable."
            action={false}
            onOpenChange={onDialogOpenChange}
          >
            <DropdownMenuItem onSelect={onDropdownSelect}>
              <MinusCircle className="h-5 w-5 text-muted-foreground" />
              Mark as unavailable
            </DropdownMenuItem>
          </AlertDialog>
        )}
        <DropdownMenuSeparator />
        <DeleteActionDialog
          title={`Delete ${deviceData.name}`}
          description={
            "This action can't be undone. You will lose all data associated with this device."
          }
          action="deleteDevice"
          id={deviceData.id}
          onOpenChange={onDialogOpenChange}
        >
          <DropdownMenuItem
            className="text-destructive data-[highlighted]:text-destructive"
            onSelect={onDropdownSelect}
          >
            <Trash2 className="h-5 w-5" />
            Delete
          </DropdownMenuItem>
        </DeleteActionDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
