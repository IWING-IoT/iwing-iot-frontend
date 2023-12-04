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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortDropDown() {
  const options = [
    { label: "A to Z", value: "ascending" },
    { label: "Z to A", value: "descending" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangeSort = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.set("sortBy", "ascending");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            className="hidden w-36 justify-between gap-2 sm:flex"
            variant="outline"
          >
            <div className="flex gap-2">
              <ArrowUpDown className="h-5 w-5" />
              {
                options.find(
                  (option) =>
                    option.value === searchParams.get("sortBy")?.toString(),
                )?.label
              }
            </div>
            <ChevronDown className="h-5 w-5" />
          </Button>
          <Button className="sm:hidden" variant="outline" size="icon">
            <ArrowUpDown className="h-5 w-5" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuRadioGroup
          value={searchParams.get("sortBy")?.toString()}
          onValueChange={handleChangeSort}
        >
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
