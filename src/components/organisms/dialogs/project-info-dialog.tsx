import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { fetchData } from "@/lib/data-fetching";
import { TProjectDetails } from "@/lib/type";
import { formatDate } from "@/lib/utils";
import { Calendar, Info, MapPin, User } from "lucide-react";
import React from "react";

type ProjectInfoDialogProps = {
  projectData: TProjectDetails;
};

export function ProjectInfoDialogTrigger() {
  return (
    <DialogTrigger asChild>
      <DropdownMenuItem>
        <Info className="h-4 w-4" />
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
