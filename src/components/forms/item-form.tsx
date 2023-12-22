"use client";
import {
  TAllEntries,
  TAttributeEntry,
  TCategoryDetails,
  TEntry,
  TEntryDefinition,
  THttpError,
} from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { DialogFooter } from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileEncode, FilePondPluginFileValidateType);

type ItemFormProps = {
  categoryId: string;
  categoryData: TCategoryDetails;
  entryData?: TAttributeEntry;
  type: "add" | "edit";
  allEntries: TAllEntries;
};

export function ItemForm({
  categoryData,
  entryData,
  type,
  allEntries,
  categoryId,
}: ItemFormProps) {
  console.log(categoryData);
  const mainAttributeField: TEntryDefinition = {
    id: uuidv4(),
    accessorKey: categoryData.mainAttribute,
    type: "string",
  };

  const fields = [mainAttributeField, ...categoryData.entryDefinitions];

  const formSchema = z.record(z.string());

  const router = useRouter();

  const addItem = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      postData(`/category/${categoryId}/entry`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to add item", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Item added successfully");
      router.refresh();
    },
  });

  // const editItem = useMutation({
  //   mutationFn: (data: z.infer<typeof formSchema>) =>
  //     postData(`/entry/${entryData?.id}`, data),
  //   onError: (error: THttpError) => {
  //     toast.error("Unable to save changes", {
  //       description: error.response.data.message,
  //     });
  //   },
  //   onSuccess: () => {
  //     toast.success("Changes saved successfully");
  //     router.refresh();
  //   },
  // });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escEvent);
    console.log(data);
    if (type === "add") {
      addItem.mutate(data);
    } else {
      // editItem.mutate(data);
    }
    router.refresh();
  }

  const defaultValues = entryData
    ? Object.entries(entryData).reduce(
        (values: Record<string, string>, [key, value]) => {
          if (typeof value === "object") {
            values[key] = value.id;
          } else {
            values[key] = value;
          }
          return values;
        },
        {},
      )
    : fields.reduce((values: Record<string, string>, entry) => {
        values[entry.accessorKey] = "";
        return values;
      }, {});
  // console.log(defaultValues);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  function renderFormFields(entry: TEntryDefinition) {
    if (entry.type === "string") {
      return (
        <FormField
          key={entry.id}
          control={form.control}
          name={entry.accessorKey}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel htmlFor={entry.accessorKey}>
                {entry.accessorKey}
              </FormLabel>
              <FormControl>
                <Input
                  id={entry.accessorKey}
                  placeholder={`Enter ${entry.accessorKey}`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (entry.type === "image") {
      return (
        <FormField
          key={entry.id}
          control={form.control}
          name={entry.accessorKey}
          render={({ field }) => (
            <FormItem className="flex h-[120px] flex-col gap-1.5">
              <FormLabel htmlFor={entry.accessorKey}>
                {entry.accessorKey}
              </FormLabel>
              <FormControl>
                <FilePond
                  id={entry.accessorKey}
                  allowFileEncode
                  allowFileTypeValidation
                  acceptedFileTypes={["image/*"]}
                  onaddfile={(error, file) => {
                    form.setValue(
                      entry.accessorKey,
                      file.getFileEncodeDataURL(),
                    );
                  }}
                  onremovefile={() => {
                    // form.setValue(entry.accessorKey, "");
                    console.log("removed");
                  }}
                  files={
                    form.getValues(entry.accessorKey)
                      ? [form.getValues(entry.accessorKey)]
                      : []
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (entry.type === "category_reference") {
      return (
        <FormField
          key={entry.id}
          control={form.control}
          name={entry.accessorKey}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel htmlFor={entry.accessorKey}>
                {entry.accessorKey}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between px-3 font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value && entry.category
                        ? allEntries[entry.category?.name].find(
                            (entry) => entry.id === field.value,
                          )?.name
                        : "Select attribute"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search attribute..." />
                    <CommandEmpty>No attribute found.</CommandEmpty>
                    <CommandGroup>
                      {entry.category &&
                        allEntries[entry.category?.name].map((option) => (
                          <CommandItem
                            value={option.name}
                            key={option.id}
                            onSelect={() => {
                              form.setValue(entry.accessorKey, option.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {option?.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        {fields.map((entry) => renderFormFields(entry))}
        <DialogFooter>
          <Button type="submit">
            {type === "add" ? "Add" : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
