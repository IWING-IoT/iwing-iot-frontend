import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TProjectDetails } from "@/lib/type";
import { formatDate } from "@/lib/utils";
import {
  Archive,
  Calendar,
  ChevronDown,
  Info,
  MapPin,
  Pen,
  Trash2,
  User,
} from "lucide-react";

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
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-8 w-8 sm:h-10 sm:w-10"
          >
            <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end">
          {/* Project info modal trigger */}
          <ProjectInfoDialogTrigger />
          <DropdownMenuItem>
            <Pen className="h-4 w-4 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Archive className="h-4 w-4 text-muted-foreground" />
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

type ProjectInfoDialogProps = {
  projectData: TProjectDetails;
};

// Separate the trigger and the content of the dialog because of radix ui's bug

export function ProjectInfoDialogTrigger() {
  return (
    <DialogTrigger asChild>
      <DropdownMenuItem>
        <Info className="h-4 w-4 text-muted-foreground" />
        Project info
      </DropdownMenuItem>
    </DialogTrigger>
  );
}

export function ProjectInfoDialogContent({
  projectData,
}: ProjectInfoDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{projectData.name}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          {projectData.description ?? "No description"}
        </p>
        <div className="flex flex-col gap-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <p>{projectData.ownerName}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <p>{projectData.location.en_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <p>{formatDate(projectData.startedAt)}</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
