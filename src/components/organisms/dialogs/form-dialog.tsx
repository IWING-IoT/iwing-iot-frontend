import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type FormDialogProps = {
  children: React.ReactNode;
  title: string;
  form: React.ReactNode;
  classNames?: string;
};

export function FormDialog({
  children,
  title,
  form,
  classNames,
}: FormDialogProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger className="hidden sm:inline-flex" asChild>
          {children}
        </DialogTrigger>
        <DialogContent className={cn(classNames)}>
          <DialogHeader className="mb-4">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {form}
        </DialogContent>
      </Dialog>
      <Drawer>
        <DrawerTrigger className="sm:hidden" asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent className={cn(classNames)}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">{form}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
