import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeftRight,
  Check,
  ChevronDown,
  Info,
  Layers,
  Pen,
  Plus,
  Trash2,
} from "lucide-react";

export const DeploymentDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <Layers className="h-5 w-5" />
          Deployment
          <ChevronDown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuItem>
          <Info className="h-4 w-4" />
          Deployment info
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pen className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Check className="h-4 w-4" />
          Mark as finished
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive data-[highlighted]:text-destructive">
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ArrowLeftRight className="h-4 w-4" />
          Switch deployment
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Plus className="h-4 w-4" />
          New deployment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
