"use client";
import { useRouter } from "next/navigation";
import { AlertDialog } from "./alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteData } from "@/lib/data-fetching";
import { THttpError } from "@/lib/type";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type DeleteActionDialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  action:
    | "removeCollaborator"
    | "deleteProject"
    | "deleteEntry"
    | "deleteCategory"
    | "deleteApiField"
    | "deleteDevice"
    | "deleteFirmware"
    | "deleteFirmwareVersion"
    | "removeDeploymentDevice"
    | "deleteDeployment"
    | "removeDeviceFirmware";
  id: string;
  onOpenChange?: (open: boolean) => void;
  redirectTo?: string;
};

export function DeleteActionDialog({
  children,
  title,
  description,
  action,
  id,
  onOpenChange,
  redirectTo,
}: DeleteActionDialogProps) {
  const router = useRouter();

  // preset delete action

  const removeCollaborator = useMutation({
    mutationFn: () => deleteData(`/collaborator/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to remove this collaborator", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Collaborator removed successfully");
    },
  });

  const deleteProject = useMutation({
    mutationFn: () => deleteData(`/project/${id}/deleted`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this project", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.push("/home");
      router.refresh();
      toast.success("Project deleted successfully");
    },
  });

  const deleteEntry = useMutation({
    mutationFn: () => deleteData(`/entry/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this item", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Item deleted successfully");
    },
  });

  const deleteCategory = useMutation({
    mutationFn: () => deleteData(`/category/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this category", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
      toast.success("Category deleted successfully");
    },
  });

  const deleteApiField = useMutation({
    mutationFn: () => deleteData(`/phaseApi/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this field", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Field deleted successfully");
    },
  });

  const deleteDevice = useMutation({
    mutationFn: () => deleteData(`/device/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this device", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Device deleted successfully");
    },
  });

  const deleteFirmware = useMutation({
    mutationFn: () => deleteData(`/firmware/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this firmware", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
      toast.success("Firmware deleted successfully");
    },
  });

  const deleteFirmwareVersion = useMutation({
    mutationFn: () => deleteData(`/firmwareVersion/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this version", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
      toast.success("Version deleted successfully");
    },
  });

  const removeDeploymentDevice = useMutation({
    mutationFn: () => deleteData(`/devicePhase/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to remove this device", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
      toast.success("Device removed successfully", {
        description:
          "This device will be returned to the pool of available devices",
      });
    },
  });

  const deleteDeployment = useMutation({
    mutationFn: () => deleteData(`/phase/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to delete this deployment", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
      toast.success("Deployment deleted successfully");
    },
  });

  const removeDeviceFirmware = useMutation({
    mutationFn: () => deleteData(`/deviceFirmware/${id}`),
    onError: (error: THttpError) => {
      toast.error("Unable to remove this firmware", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Firmware removed successfully");
    },
  });

  let submitLabel;
  if (
    action === "removeCollaborator" ||
    action === "removeDeploymentDevice" ||
    action === "removeDeviceFirmware"
  ) {
    submitLabel = "Remove";
  } else {
    submitLabel = "Delete";
  }

  const handleDelete = () => {
    if (!action) return;
    switch (action) {
      case "removeCollaborator":
        removeCollaborator.mutate();
        break;
      case "deleteProject":
        deleteProject.mutate();
        break;
      case "deleteEntry":
        deleteEntry.mutate();
        break;
      case "deleteCategory":
        deleteCategory.mutate();
        break;
      case "deleteApiField":
        deleteApiField.mutate();
        break;
      case "deleteDevice":
        deleteDevice.mutate();
        break;
      case "deleteFirmware":
        deleteFirmware.mutate();
        break;
      case "deleteFirmwareVersion":
        deleteFirmwareVersion.mutate();
        break;
      case "removeDeploymentDevice":
        removeDeploymentDevice.mutate();
        break;
      case "deleteDeployment":
        deleteDeployment.mutate();
        break;
      case "removeDeviceFirmware":
        removeDeviceFirmware.mutate();
        break;
      default:
        break;
    }
  };

  return (
    <AlertDialog
      variant="error"
      icon={<Trash2 />}
      title={title}
      description={description}
      onClickSubmit={() => handleDelete()}
      submitButtonLabel={submitLabel}
      onOpenChange={onOpenChange}
    >
      {children}
    </AlertDialog>
  );
}
