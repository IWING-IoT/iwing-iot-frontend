"use client";
import { useRouter } from "next/navigation";
import { AlertDialog } from "./alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { patchData } from "@/lib/data-fetching";
import { THttpError } from "@/lib/type";
import { toast } from "sonner";

type PatchActionDialogProps = {
  children: React.ReactNode;
  variant: "brand" | "error" | "success" | "warning";
  icon: React.ReactNode;
  title: string;
  description: string;
  action: "archiveProject" | "disableDevice" | "enableDevice";
  id: string;
  onOpenChange?: (open: boolean) => void;
};

export function PatchActionDialog({
  children,
  variant,
  icon,
  title,
  description,
  action,
  id,
  onOpenChange,
}: PatchActionDialogProps) {
  const router = useRouter();

  // preset patch action

  const archiveProject = useMutation({
    mutationFn: () =>
      patchData(
        `/project/${id}/archived`,
        JSON.stringify({ isArchived: true }),
      ),
    onError: (error: THttpError) => {
      toast.error("Unable to archive this project", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.push("/home");
      router.refresh();
      toast.success("Project archived successfully");
    },
  });

  const disableDevice = useMutation({
    mutationFn: () => patchData(`/device/${id}/disable`, { disable: true }),
    onError: (error: THttpError) => {
      toast.error("Unable to mark as unavailable", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Device marked as unavailable");
    },
  });

  const enableDevice = useMutation({
    mutationFn: () => patchData(`/device/${id}/disable`, { disable: false }),
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

  let submitLabel;
  if (action === "archiveProject") {
    submitLabel = "Archive";
  } else if (action === "disableDevice") {
    submitLabel = "Mark as unavailable";
  } else if (action === "enableDevice") {
    submitLabel = "Mark as available";
  } else {
    submitLabel = "Save changes";
  }

  const handlePatch = () => {
    if (!action) return;
    switch (action) {
      case "archiveProject":
        archiveProject.mutate();
        break;
      case "disableDevice":
        disableDevice.mutate();
        break;
      case "enableDevice":
        enableDevice.mutate();
        break;
      default:
        break;
    }
  };

  return (
    <AlertDialog
      variant={variant}
      icon={icon}
      title={title}
      description={description}
      onClickSubmit={() => handlePatch()}
      submitButtonLabel={submitLabel}
      onOpenChange={onOpenChange}
    >
      {children}
    </AlertDialog>
  );
}
