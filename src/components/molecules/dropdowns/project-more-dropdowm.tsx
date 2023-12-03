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
import {
  Archive,
  List,
  MoreHorizontal,
  Pen,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

type ProjectMoreDropdownProps = {
  projectId: string;
  projectData: TProjectDetails;
};

export const ProjectMoreDropdown = async ({
  projectId,
  projectData,
}: ProjectMoreDropdownProps) => {
  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <MoreHorizontal className="h-5 w-5" />
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
          <DropdownMenuItem asChild>
            <Link href={`/project/${projectId}/collaborators`}>
              <Users className="h-4 w-4" />
              Collaborators
            </Link>
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
      <ProjectInfoDialogContent projectData={projectData} />
    </Dialog>
  );
};
