"use client";
import { useRouter } from "next/navigation";
import { AlertDialog } from "./alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { THttpError } from "@/lib/type";
import { toast } from "sonner";

type PostActionDialogProps = {
  children: React.ReactNode;
  variant: "error" | "success" | "warning";
  icon: React.ReactNode;
  title: string;
  description: string;
  action: "replaceWithPreviousApi";
  id: string;
  onOpenChange?: (open: boolean) => void;
};

export function PostActionDialog({
  children,
  variant,
  icon,
  title,
  description,
  action,
  id,
  onOpenChange,
}: PostActionDialogProps) {
  const router = useRouter();

  // preset post action

  const replaceWithPreviousApi = useMutation({
    mutationFn: () => postData(`/phase/${id}/phaseApi/copy`),
    onError: (error: THttpError) => {
      toast.error("Unable to replace API fields", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("API fields replaced successfully");
      router.refresh();
    },
  });

  let submitLabel;
  if (action === "replaceWithPreviousApi") {
    submitLabel = "Replace";
  }

  const handlePost = () => {
    if (!action) return;
    switch (action) {
      case "replaceWithPreviousApi":
        replaceWithPreviousApi.mutate();
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
      onClickSubmit={() => handlePost()}
      submitButtonLabel={submitLabel}
      onOpenChange={onOpenChange}
    >
      {children}
    </AlertDialog>
  );
}
