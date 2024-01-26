"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchParamsDropdownProps =
  | {
      options: {
        label: string;
        value: string;
      }[];
      paramsName: string;
      triggerButton?: React.ReactNode;
      type: "radio";
    }
  | {
      options: {
        label: string;
        value: string;
        icon: React.ReactNode;
      }[];
      paramsName: string;
      triggerButton: React.ReactNode;
      type: "default";
    };

export function SearchParamsDropdown({
  options,
  paramsName,
  triggerButton,
  type,
}: SearchParamsDropdownProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (option: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramsName, option);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {type === "radio" ? (
          <DropdownMenuRadioGroup
            value={searchParams.get(paramsName)?.toString()}
            onValueChange={handleChange}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        ) : (
          options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => handleChange(option.value)}
            >
              {option.icon}
              {option.label}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
