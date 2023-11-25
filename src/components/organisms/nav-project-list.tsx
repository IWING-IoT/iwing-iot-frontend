"use client";

import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import NavItem from "../molecules/nav-item";
import Avvvatars from "avvvatars-react";
import { TProject } from "@/lib/type";

type NavProjectListProps = {
  projectItems: TProject[];
};

export const NavProjectList = ({ projectItems }: NavProjectListProps) => {
  return (
    <ScrollArea>
      <div className="flex flex-1 flex-col gap-1 pl-4 pr-4">
        {projectItems.map((item) => (
          <NavItem
            href={"/project"}
            label={item.name}
            icon={<Avvvatars value={item.name} size={24} borderSize={1} />}
            key={item.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default NavProjectList;
