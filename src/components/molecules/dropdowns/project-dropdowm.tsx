import {
  ProjectInfoDialogContent,
  ProjectInfoDialogTrigger,
} from "@/components/organisms/dialogs/project-info-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TProjectDetails } from "@/lib/type";
import { Archive, ChevronDown, Pen, Trash2 } from "lucide-react";

type ProjectMoreDropdownProps = {
  projectId: string;
  projectData: TProjectDetails;
};

export async function ProjectDropdown({
  projectId,
  projectData,
}: ProjectMoreDropdownProps) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <ChevronDown className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end">
          {/* Project info modal trigger */}
          <ProjectInfoDialogTrigger />
          <DropdownMenuItem>
            <Pen className="h-4 w-4" />
            Edit
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
      <ProjectInfoDialogContent projectData={projectData} />
    </Dialog>
  );
}
