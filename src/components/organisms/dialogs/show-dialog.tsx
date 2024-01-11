"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { showDialogAtom } from "@/store/atoms";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { useAtom } from "jotai";

export default function ShowDialog() {
  const [showDialog, setShowDialog] = useAtom(showDialogAtom);
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) {
    return (
      <Drawer
        open={showDialog.show}
        onOpenChange={(open) => setShowDialog({ ...showDialog, show: open })}
      >
        <DrawerContent className="h-fit">
          <DrawerHeader>
            <DrawerTitle>{showDialog.title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">{showDialog.children}</div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog
      open={showDialog.show}
      onOpenChange={(open) => setShowDialog({ ...showDialog, show: open })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{showDialog.title}</DialogTitle>
        </DialogHeader>
        {showDialog.children}
      </DialogContent>
    </Dialog>
  );
}
