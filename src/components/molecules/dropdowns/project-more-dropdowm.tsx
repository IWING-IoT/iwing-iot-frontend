import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  Info,
  List,
  MoreHorizontal,
  Pen,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";

export const ProjectMoreDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuItem>
          <Info className="h-4 w-4" />
          Project info
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pen className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Users className="h-4 w-4" />
          Collaborators
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserPlus className="h-4 w-4" />
          Invite collaborators
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <List className="h-4 w-4" />
          Attribute data
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Archive className="h-4 w-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive data-[highlighted]:text-destructive">
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
