"use client";
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
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type ComboboxProps = {
  children: React.ReactNode;
  options: { label: string; value: string }[];
  value: string;
  onSelect: (value: string) => void;
  searchPlaceholder: string;
  emptyPlaceholder: string;
  drawerHeader: string;
};

export function Combobox({
  children,
  options,
  value,
  onSelect,
  searchPlaceholder,
  emptyPlaceholder,
  drawerHeader,
}: ComboboxProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{drawerHeader}</DrawerTitle>
          </DrawerHeader>
          <ItemList
            options={options}
            value={value}
            onSelect={onSelect}
            searchPlaceholder={searchPlaceholder}
            emptyPlaceholder={emptyPlaceholder}
          />
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="min-w-[400px] p-0">
        <ItemList
          options={options}
          value={value}
          onSelect={onSelect}
          searchPlaceholder={searchPlaceholder}
          emptyPlaceholder={emptyPlaceholder}
        />
      </PopoverContent>
    </Popover>
  );
}

function ItemList({
  options,
  value,
  onSelect,
  searchPlaceholder,
  emptyPlaceholder,
}: Omit<ComboboxProps, "children" | "drawerHeader">) {
  return (
    <Command>
      <CommandInput
        className="text-base sm:text-sm"
        placeholder={searchPlaceholder}
      />
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
  );
}
