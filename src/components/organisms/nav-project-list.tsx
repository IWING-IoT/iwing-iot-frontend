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
        {projectItems.map((item) => (
          <NavItem
            href={`/project/${item.id}`}
            label={item.name}
            icon={<CustomAvatar value={item.name} size={24} />}
            key={item.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default NavProjectList;
