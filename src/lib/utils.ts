import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import { TFirmwareType, TPermission } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
function getRelativeTimeString(date: Date | number, locales = "en"): string {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array representing one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(locales, { numeric: "always" });
  const result =
    deltaSeconds / divisor < 0
      ? Math.ceil(deltaSeconds / divisor)
      : Math.floor(deltaSeconds / divisor);
  return rtf.format(result, units[unitIndex]);
}

export function formatDate(
  dateInput: string | Date,
  formatType: "default" | "relative" = "default",
  withTime = false,
) {
  const date = new Date(dateInput);
  const options: Intl.DateTimeFormatOptions = withTime
    ? {
        dateStyle: "long",
        timeStyle: "medium",
      }
    : {
        dateStyle: "long",
      };
  if (formatType === "relative") {
    return getRelativeTimeString(date);
  }
  return date.toLocaleString("en-GB", options);
}

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement[];
}

export const permission: Record<string, TPermission[]> = {
  deployment_finished: ["view"],
  project_archived: ["view"],
  can_view: ["view"],
  can_edit: ["view", "edit"],
  owner: ["view", "edit", "delete", "transferOwnership"],
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

export const firmwareType: Record<TFirmwareType, string> = {
  source: "Source code",
  config: "Config file",
  binary: "Binary file",
};

export function subtractDay(date: Date, day: number): Date {
  return new Date(date.getTime() - day * 24 * 60 * 60 * 1000);
}

export function stringToColor(str: string) {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
}

export function numberToStatusColor(value: string, type: "battery" | "signal") {
  if (value === "0") {
    return "bg-red-500";
  }
  if (value === "1") {
    return "bg-green-500";
  }
  return "bg-gray-500";
}
