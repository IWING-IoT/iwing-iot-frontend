"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import { sheetAtom } from "@/store/atoms";

type NavItemProps = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export default function NavItem({ label, icon, href }: NavItemProps) {
  const [open, setOpen] = useAtom(sheetAtom);
  return (
    <Button
      variant="ghost"
      className="justify-start gap-2 rounded-md px-3 py-2 text-muted-foreground"
      onClick={() => setOpen(false)}
      asChild
    >
      <Link
        href={href}
        className="flex flex-1 items-center justify-start gap-3"
      >
        <div>{icon}</div>
        <p className="truncate text-base font-medium">{label}</p>
      </Link>
    </Button>
  );
}
