import {
  GripVertical,
  Hash,
  Image,
  Link,
  Pen,
  Trash2,
  Type,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { AlertDialog } from "../organisms/dialogs/alert-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const labels = {
  string: { icon: <Type />, label: "String" },
  image: { icon: <Image />, label: "Image" },
  number: { icon: <Hash />, label: "Number" },
  category_reference: { icon: <Link />, label: "Category reference" },
};

type AttributeCardProps = {
  id: string;
  type: keyof typeof labels;
  name: string;
  referenceFrom?: string;
  children: React.ReactNode;
  onDelete: () => void;
};

export function AttributeCard({
  id,
  type,
  name,
  referenceFrom,
  children,
  onDelete,
}: AttributeCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Card
      className="flex flex-1 touch-none gap-4 rounded-md p-4"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="text-muted-foreground" />
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex gap-2">
          {labels[type].icon}{" "}
          <p>
            {labels[type].label}{" "}
            {referenceFrom && (
              <span className="text-muted-foreground">({referenceFrom})</span>
            )}
          </p>
        </div>
        <div className="flex flex-1 gap-4">{children}</div>
      </div>
      <AlertDialog
        variant="error"
        icon={<Trash2 className="h-5 w-5" />}
        title={`Delete ${name}`}
        description="This action cannot be undone. You will lose all data associated with this attribute."
        submitButtonLabel="Delete"
        onClickSubmit={onDelete}
      >
        <Button
          type="button"
          size={"icon"}
          variant={"outline"}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </AlertDialog>
    </Card>
  );
}
