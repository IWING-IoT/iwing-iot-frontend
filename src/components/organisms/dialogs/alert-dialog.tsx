import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FeatureIcon } from "@/components/atoms/feature-icon";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";

type AlertDialogProps = {
  children: React.ReactNode;
  variant: "brand" | "error" | "success" | "warning";
  title: string;
  description: string;
  className?: string;
  submitButton?: React.ReactNode;
  onClickSubmit?: () => void;
  submitButtonLabel?: string;
  icon: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
};

export function AlertDialog({
  children,
  variant,
  title,
  description,
  className,
  submitButton,
  onClickSubmit,
  submitButtonLabel,
  icon,
  onOpenChange,
}: AlertDialogProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) {
    return (
      <Drawer onOpenChange={onOpenChange}>
        <DrawerTrigger className="sm:hidden" asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent className={cn(className, "h-fit p-4")}>
          <DrawerHeader className="gap-3 border-none text-left">
            <FeatureIcon icon={icon} variant={variant} />
            <div className="flex flex-col gap-1">
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                {description}
              </DrawerDescription>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DrawerClose>
            {submitButton ? (
              <DrawerClose asChild>{submitButton}</DrawerClose>
            ) : (
              <Button
                onClick={onClickSubmit}
                variant={variant === "error" ? "destructive" : "default"}
              >
                {submitButtonLabel}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className="hidden sm:flex" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={cn("w-[400px]", className)}>
        <DialogHeader className="gap-2.5">
          <FeatureIcon icon={icon} variant={variant} />
          <div className="flex flex-col gap-1">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} className="flex-1">
              Cancel
            </Button>
          </DialogClose>
          {submitButton ? (
            <DialogClose asChild>{submitButton}</DialogClose>
          ) : (
            <Button
              className="flex-1"
              onClick={onClickSubmit}
              variant={variant === "error" ? "destructive" : "default"}
            >
              {submitButtonLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
