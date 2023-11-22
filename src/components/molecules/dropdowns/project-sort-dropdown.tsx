"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SortDropDown() {
  const options = [
    { label: "A to Z", value: "ascending" },
    { label: "Z to A", value: "descending" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];
  const [sort, setSort] = useState("ascending");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            className="hidden w-36 justify-between gap-2 sm:flex"
            variant="outline"
          >
            <div className="flex gap-2">
              <ArrowUpDown width={20} height={20} />
              {options.find((option) => option.value === sort)?.label}
            </div>
            <ChevronDown width={20} height={20} />
          </Button>
          <Button className="sm:hidden" variant="outline" size="icon">
            <ArrowUpDown width={20} height={20} />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
