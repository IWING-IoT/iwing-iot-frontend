"use client";
import React from "react";
import { Button } from "../ui/button";
import { TUser } from "@/lib/type";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { CustomAvatar } from "../atoms/custom-avatar";

type NavProfileProps = {
  user: TUser;
};

export function NavProfile({ user }: NavProfileProps) {
  return (
    <div className="flex items-center justify-between pl-4 pr-4">
      <div className="flex items-center gap-4">
        <CustomAvatar value={user.name} size={40} />
        <div className="flex flex-col">
          <p className="font-semibold">{user.name}</p>
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
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}
