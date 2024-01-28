"use client";
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
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { ScrollArea } from "@/components/ui/scroll-area";

type DialogWithContentProps = {
  children: React.ReactNode;
  title: string;
  content: React.ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
};

export default function DialogWithContent({
  children,
  title,
  content,
  className,
  onOpenChange,
}: DialogWithContentProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) {
    return (
      <Drawer onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className={cn(className)}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">{content}</div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("p-0", className)}>
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6 pt-0">{content}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
