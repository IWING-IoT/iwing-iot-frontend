"use client";
import { useRouter } from "next/navigation";
import { AlertDialog } from "./alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { patchData } from "@/lib/data-fetching";
import { THttpError } from "@/lib/type";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type PatchActionDialogProps = {
  children: React.ReactNode;
  variant: "brand" | "error" | "success" | "warning";
  icon: React.ReactNode;
  title: string;
  description: string;
  action: "archiveProject";
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

  // preset delete action

  const archiveProject = useMutation({
    mutationFn: () =>
      patchData(
        `/project/${id}/archived`,
        JSON.stringify({ isArchived: true }),
      ),
    onError: (error: THttpError) => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      toast.error("Unable to archive this project", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      router.push("/home");
      router.refresh();
      toast.success("Project archived successfully");
    },
  });

  let submitLabel;
  if (action === "archiveProject") {
    submitLabel = "Archive";
  } else {
    submitLabel = "Save changes";
  }

  const handlePatch = () => {
    if (!action) return;
    switch (action) {
      case "archiveProject":
        archiveProject.mutate();
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
      submitButton={
        <Button
          variant={variant === "error" ? "destructive" : "default"}
          className="flex-1"
          onClick={() => handlePatch()}
        >
          {submitLabel}
        </Button>
      }
      onOpenChange={onOpenChange}
    >
      {children}
    </AlertDialog>
  );
}
