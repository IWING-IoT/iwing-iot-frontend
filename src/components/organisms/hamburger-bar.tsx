"use client";
import { Button } from "@/components/ui/button";
import NavContent from "./nav-content";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useAtom } from "jotai";
import { sheetAtom } from "@/store/atoms";

type HamburgerBarProps = {
  children?: React.ReactNode;
};

export default function HamburgerBar({ children }: HamburgerBarProps) {
  const [open, setOpen] = useAtom(sheetAtom);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen w-80" side="left">
        {children}
      </SheetContent>
    </Sheet>
  );
}
