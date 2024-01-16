import { Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, generateEscEvent } from "@/lib/utils";

type ComboboxProps = {
  children: React.ReactNode;
  options: { label: string; value: string }[];
  value: string;
  onSelect: (value: string) => void;
  searchPlaceholder: string;
  emptyPlaceholder: string;
};

export function Combobox({
  children,
  options,
  value,
  onSelect,
  searchPlaceholder,
  emptyPlaceholder,
}: ComboboxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="min-w-[400px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyPlaceholder}.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => {
                  onSelect(option.value);
                  generateEscEvent();
                }}
              >
                {option.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    option.value === value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
