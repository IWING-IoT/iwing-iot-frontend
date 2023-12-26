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
    | "deleteCategory";
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
      router.push("/home");
      router.refresh();
      toast.success("Project deleted successfully");
    },
  });

  const deleteEntry = useMutation({
    mutationFn: () => deleteData(`/entry/${id}`),
    onError: (error: THttpError) => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      toast.error("Unable to delete this item", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      router.refresh();
      toast.success("Item deleted successfully");
    },
  });

  const deleteCategory = useMutation({
    mutationFn: () => deleteData(`/category/${id}`),
    onError: (error: THttpError) => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      toast.error("Unable to delete this category", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
      toast.success("Category deleted successfully");
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
        break;
      case "deleteEntry":
        deleteEntry.mutate();
        break;
      case "deleteCategory":
        deleteCategory.mutate();
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
