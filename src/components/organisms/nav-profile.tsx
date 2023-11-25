"use client";
import Avvvatars from "avvvatars-react";
import React from "react";
import { Button } from "../ui/button";
import { TUser } from "@/lib/type";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type NavProfileProps = {
  user: TUser;
};

const NavProfile = ({ user }: NavProfileProps) => {
  return (
    <div className="flex items-center justify-between pl-4 pr-4">
      <div className="flex items-center gap-4">
        <Avvvatars value={user.name} size={40} borderSize={1} />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-sm capitalize text-muted-foreground">
            {user.role}
          </p>
        </div>
      </div>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-muted-foreground"
        onClick={() => signOut({ callbackUrl: `/signin` })}
      >
        <LogOut size={20} />
      </Button>
    </div>
  );
};

export default NavProfile;
