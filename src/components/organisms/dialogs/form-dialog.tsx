import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormDialogProps = {
  children: React.ReactNode;
  title: string;
  form: React.ReactNode;
  classNames?: string;
};

const FormDialog = ({ children, title, form, classNames }: FormDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn(classNames)}>
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
