"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import NavItem from "../molecules/nav-item";
import { TProject } from "@/lib/type";
import CustomAvatar from "../atoms/custom-avatar";

type NavProjectListProps = {
  projectItems: TProject[];
};

export const NavProjectList = ({ projectItems }: NavProjectListProps) => {
  return (
    <ScrollArea className="[&>div>div]:!block">
      <div className="flex flex-1 flex-col gap-1 pl-4 pr-4">
        {projectItems.map((project) => (
          <NavItem
            href={
              project.activePhaseId
                ? `/project/${project.id}/phase/${project.activePhaseId}/dashboard`
                : `/project/${project.id}/phase`
            }
            label={project.name}
            icon={<CustomAvatar value={project.name} size={24} />}
            key={project.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default NavProjectList;
