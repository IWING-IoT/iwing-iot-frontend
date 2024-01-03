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
  dateString: string,
  formatType: "default" | "relative" = "default",
) {
  const date = new Date(dateString);
  if (formatType === "relative") {
    return getRelativeTimeString(date);
  }
  return `${date.getDate()} ${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
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

export const firmwareType: Record<TFirmwareType, string> = {
  source: "Source code",
  config: "Config file",
  binary: "Binary file",
};
