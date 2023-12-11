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

type DialogWithContentProps = {
  children: React.ReactNode;
  title: string;
  content: React.ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
};

export function DialogWithContent({
  children,
  title,
  content,
  className,
  onOpenChange,
}: DialogWithContentProps) {
  return (
    <>
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger className="hidden sm:flex" asChild>
          {children}
        </DialogTrigger>
        <DialogContent className={cn(className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
      <Drawer onOpenChange={onOpenChange}>
        <DrawerTrigger className="sm:hidden" asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent className={cn(className)}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">{content}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
