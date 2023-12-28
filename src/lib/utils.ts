import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatRelative, parseISO } from "date-fns";
import React from "react";
import { TPermission } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  formatType: "default" | "relative" = "default",
) {
  const date = parseISO(dateString);
  if (formatType === "relative") {
    return formatRelative(date, new Date());
  }
  return format(date, "d MMMM yyyy");
}

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[];
}

export const permission: Record<string, TPermission[]> = {
  archived: ["view"],
  can_view: ["view"],
  can_edit: ["view", "edit"],
  owner: ["view", "edit", "delete"],
};

export function stopPropagate(callback: () => void) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };
}

// Deal with radix ui dropdown bugs

export const onDialogOpenChange = (open: boolean) => {
  if (open === false) {
    setTimeout(() => {
      const escEvent = new KeyboardEvent("keydown", {
        key: "Escape",
      });
      document.dispatchEvent(escEvent);
    }, 200);
  }
};
export const onDropdownSelect = (e: Event) => {
  e.preventDefault();
};

export const generateEscEvent = () => {
  const escEvent = new KeyboardEvent("keydown", {
    key: "Escape",
  });
  document.dispatchEvent(escEvent);
};
