"use client";
import { useRouter } from "next/navigation";
import { AlertDialog } from "./alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteData } from "@/lib/data-fetching";
import { THttpError } from "@/lib/type";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteActionDialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  action: "removeCollaborator" | "deleteProject";
  id: string;
  onOpenChange?: (open: boolean) => void;
};

export function DeleteActionDialog({
  children,
  title,
  description,
  action,
  id,
  onOpenChange,
}: DeleteActionDialogProps) {
  const router = useRouter();

  // preset delete action

  const removeCollaborator = useMutation({
    mutationFn: () => deleteData(`/collaborator/${id}`),
    onError: (error: THttpError) => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      toast.error("Unable to remove this collaborator", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      router.refresh();
      toast.success("Collaborator removed successfully");
    },
  });

  const deleteProject = useMutation({
    mutationFn: () => deleteData(`/project/${id}/deleted`),
    onError: (error: THttpError) => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      toast.error("Unable to delete this project", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      router.push("/home?sortBy=ascending");
      router.refresh();
      toast.success("Project deleted successfully");
    },
  });

  let submitLabel;
  if (action === "removeCollaborator") {
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
      submitButton={
        <Button
          variant={"destructive"}
          className="flex-1"
          onClick={() => handleDelete()}
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
