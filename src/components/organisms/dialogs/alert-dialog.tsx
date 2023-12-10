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

type AlertDialogProps = {
  children: React.ReactNode;
  variant: "brand" | "error" | "success" | "warning";
  title: string;
  description: string;
  classNames?: string;
  submitButton?: React.ReactNode;
  onClickSubmit?: () => void;
  submitButtonLabel?: string;
  icon: React.ReactNode;
};

export function AlertDialog({
  children,
  variant,
  title,
  description,
  classNames,
  submitButton,
  onClickSubmit,
  submitButtonLabel,
  icon,
}: AlertDialogProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger className="hidden sm:inline-flex" asChild>
          {children}
        </DialogTrigger>
        <DialogContent className={cn("w-[400px]", classNames)}>
          <DialogHeader className="gap-4">
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
      <Drawer>
        <DrawerTrigger className="sm:hidden" asChild>
          {children}
        </DrawerTrigger>
        <DrawerContent className={cn(classNames, "h-fit p-4")}>
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
                className="flex-1"
                onClick={onClickSubmit}
                variant={variant === "error" ? "destructive" : "default"}
              >
                {submitButtonLabel}
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
