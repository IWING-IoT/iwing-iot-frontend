"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchParamsDropdownProps = {
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  icon?: React.ReactNode;
};

export function SearchParamsDropdown({
  options,
  name,
  icon,
}: SearchParamsDropdownProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (option: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, option);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2" variant="outline">
          {icon}
          {
            options.find(
              (option) => option.value === searchParams.get(name)?.toString(),
            )?.label
          }
          <ChevronDown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={searchParams.get(name)?.toString()}
          onValueChange={handleChange}
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
