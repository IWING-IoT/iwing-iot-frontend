"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showDialogAtom } from "@/store/atoms";
import { useAtom } from "jotai";

export function ShowDialog() {
  const [showDialog, setShowDialog] = useAtom(showDialogAtom);
  return (
    <Dialog
      open={showDialog.show}
      onOpenChange={(open) => setShowDialog({ ...showDialog, show: open })}
    >
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>{showDialog.title}</DialogTitle>
        </DialogHeader>
        {showDialog.children}
      </DialogContent>
    </Dialog>
  );
}
