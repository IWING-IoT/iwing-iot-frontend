"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlayCircle, StopCircle, Trash2 } from "lucide-react";
import { PatchActionDialog } from "../dialogs/patch-action-dialog";
import { TDeploymentDeviceDetails, THttpError } from "@/lib/type";
import { DeleteActionDialog } from "../dialogs/delete-action-dialog";
import { onDialogOpenChange, onDropdownSelect } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { patchData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Restricted from "@/components/providers/permission-provider/restricted";

type DeploymentDevicesColumnsDropdownProps = {
  deploymentDeviceData: TDeploymentDeviceDetails;
};

export function DeploymentDevicesColumnsDropdown({
  deploymentDeviceData,
}: DeploymentDevicesColumnsDropdownProps) {
  const router = useRouter();

  const enableDeploymentDevice = useMutation({
    mutationFn: () =>
      patchData(`/devicePhase/${deploymentDeviceData.id}/status`, {
        isActive: true,
      }),
    onError: (error: THttpError) => {
      toast.error("Unable to start receiving", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Start receiving data from this device");
    },
  });

  return (
    <Restricted to="edit">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {deploymentDeviceData.status === "active" ? (
            <PatchActionDialog
              variant="warning"
              icon={<StopCircle />}
              title={`Stop receiving data from ${deploymentDeviceData.alias}`}
              description="We'll no longer be receiving and processing data from this device."
              action="disableDeploymentDevice"
              id={deploymentDeviceData.id}
              onOpenChange={onDialogOpenChange}
            >
              <DropdownMenuItem onSelect={onDropdownSelect}>
                <StopCircle className="h-4 w-4" />
                Stop receiving
              </DropdownMenuItem>
            </PatchActionDialog>
          ) : (
            <DropdownMenuItem onSelect={() => enableDeploymentDevice.mutate()}>
              <PlayCircle className="h-4 w-4" />
              Start receiving
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DeleteActionDialog
            title={`Remove ${deploymentDeviceData.alias} from this deployment`}
            description="This action cannot be undone. You will lose all data associated with this device."
            action="removeDeploymentDevice"
            id={deploymentDeviceData.id}
            onOpenChange={onDialogOpenChange}
          >
            <DropdownMenuItem
              className="text-destructive data-[highlighted]:text-destructive"
              onSelect={onDropdownSelect}
            >
              <Trash2 className="h-4 w-4" />
              Remove from this deployment
            </DropdownMenuItem>
          </DeleteActionDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </Restricted>
  );
}
