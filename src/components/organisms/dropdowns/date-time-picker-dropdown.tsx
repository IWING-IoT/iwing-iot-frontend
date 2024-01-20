"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/molecules/time-picker";

type DateTimePickerDropdownProps = {
  className?: string;
  date: Date;
  setDate: (date: Date) => void;
};

export function DateTimePickerDropdown({
  className,
  date,
  setDate,
}: DateTimePickerDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left tabular-nums",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date, "default", true) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          initialFocus
        />
        <div className="border-t border-border p-3">
          <TimePicker
            setDate={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
            date={date}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
