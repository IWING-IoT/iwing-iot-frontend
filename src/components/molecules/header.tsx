import { cn } from "@/lib/utils";
import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full justify-between border-b p-4 sm:p-6",
        className,
      )}
    >
      {children}
    </header>
  );
}

export function HeaderContent({ children, className }: HeaderProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function HeaderTitle({ children, className }: HeaderProps) {
  return (
    <h1 className={cn("text-2xl font-semibold", className)}>{children}</h1>
  );
}

export function HeaderDescription({ children, className }: HeaderProps) {
  return (
    <p className={cn("text-base text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export function HeaderActions({ children, className }: HeaderProps) {
  return <div className={cn("flex gap-2", className)}>{children}</div>;
}
