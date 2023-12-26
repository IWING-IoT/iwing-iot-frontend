"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { object, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderDescription,
  SectionHeaderTextContent,
  SectionHeaderTitle,
} from "../molecules/section-header";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { DialogWithContent } from "../organisms/dialogs/dialog-with-content";
import { AttributeCard } from "../molecules/attribute-card";
import { RadioGroup } from "../ui/radio-group";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { DialogFooter } from "../ui/dialog";
import { cn, generateEscEvent, stopPropagate } from "@/lib/utils";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MouseSensor, TouchSensor } from "@dnd-kit/core";
import { TCategory, TCategoryDetails, THttpError } from "@/lib/type";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { useMutation } from "@tanstack/react-query";
import { postData, putData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type CategoryFormProps = {
  allCategoryData: TCategory[];
  projectId: string;
  categoryData?: TCategoryDetails;
  categoryId?: string;
  type: "create" | "edit";
};

export function CategoryForm({
  allCategoryData,
  projectId,
  categoryData,
  categoryId,
  type,
}: CategoryFormProps) {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1).max(100, { message: "Character limit exceeded" }),
    description: z.string(),
    mainAttribute: z.string().min(1),
    otherAttribute: z.array(
      object({
        name: z.string().min(1),
        type: z.enum(["string", "image", "category_reference"]),
        referenceFrom: z.string(),
      }),
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: categoryData ? categoryData.name : "",
      description: categoryData ? categoryData.description : "",
      mainAttribute: categoryData ? categoryData.mainAttribute : "",
      otherAttribute: categoryData
        ? categoryData.entryDefinitions.map((entry) => ({
            id: entry.id,
            name: entry.accessorKey,
            type: entry.type,
            referenceFrom: entry.category?.id || "",
          }))
        : [],
    },
    mode: "onChange",
  });
  const { control } = form;

  const { fields, append, remove, move } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "otherAttribute", // unique name for your Field Array
  });

  function onDelete(index: number) {
    const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escEvent);
    setTimeout(() => remove(index), 200);
  }

  const addAttributeFormSchema = z.object({
    name: z
      .string()
      .min(1)
      .refine(
        (name) => {
          const itemNameArray = form
            .getValues()
            .otherAttribute.map((item) => item.name);
          itemNameArray.push(form.getValues().mainAttribute);
          return itemNameArray.includes(name) !== true;
        },
        {
          message: "This name already exists",
        },
      ),
    type: z.enum(["string", "image", "category_reference"]),
    referenceFrom: z.string().refine(
      (val) => {
        if (
          addAttributeForm.getValues().type === "category_reference" &&
          !val
        ) {
          return false;
        }
        // console.log(val);
        return true;
      },
      {
        message: "Required",
      },
    ),
  });
  const addAttributeForm = useForm<z.infer<typeof addAttributeFormSchema>>({
    resolver: zodResolver(addAttributeFormSchema),
    defaultValues: {
      name: "",
      referenceFrom: "",
    },
    mode: "onChange",
  });

  const watchDataType = addAttributeForm.watch("type");

  const createCategory = useMutation({
    mutationFn: (data: Omit<TCategory, "id">) =>
      postData(`/project/${projectId}/category`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to create category", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Category created successfully");
      router.push(`/project/${projectId}/attribute-data`);
      router.refresh();
    },
  });

  const editCategory = useMutation({
    mutationFn: (data: Omit<TCategory, "id">) =>
      putData(`/category/${categoryId}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.push(`/project/${projectId}/category/${categoryId}`);
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
    // console.log(form.getValues());
    if (type === "create") {
      createCategory.mutate(data);
    } else {
      editCategory.mutate(form.getValues());
    }
  }
  function onAttributeSubmit(data: z.infer<typeof addAttributeFormSchema>) {
    const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(escEvent);
    // console.log(data);
    append(data);
    addAttributeForm.reset();
  }

  //dnd-kit

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over?.id) {
      const activeIndex = active.data.current?.sortable?.index;
      const overIndex = over.data.current?.sortable?.index;
      // console.log({ activeIndex, overIndex });
      if (activeIndex !== undefined && overIndex !== undefined) {
        move(activeIndex, overIndex);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Category name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Max 100 characters</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter category description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <SectionHeader>
          <SectionHeaderTextContent>
            <SectionHeaderTitle>Main attribute</SectionHeaderTitle>
            <SectionHeaderDescription>
              This will serve as the primary column for this category.{" "}
            </SectionHeaderDescription>
          </SectionHeaderTextContent>
        </SectionHeader>
        <FormField
          control={form.control}
          name="mainAttribute"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="mainAttribute">Main attribute</FormLabel>
              <FormControl>
                <Input
                  id="mainAttribute"
                  placeholder="Enter main attribute"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <SectionHeader>
          <SectionHeaderTextContent>
            <SectionHeaderTitle>Other attributes</SectionHeaderTitle>
            <SectionHeaderDescription>
              Drag to reorder attributes, table columns will match this order.
            </SectionHeaderDescription>
          </SectionHeaderTextContent>
          <SectionHeaderAction>
            <DialogWithContent
              title="Add attribute"
              content={
                <Form {...addAttributeForm}>
                  <form
                    onSubmit={stopPropagate(
                      addAttributeForm.handleSubmit(onAttributeSubmit),
                    )}
                    className="flex flex-1 flex-col space-y-6"
                  >
                    <FormField
                      control={addAttributeForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="name">Attribute name</FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              placeholder="Enter attribute name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addAttributeForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Select data type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              className="flex flex-col space-y-1"
                              defaultValue={field.value}
                            >
                              <CustomRadioItem value={"string"}>
                                <CustomRadioItemContainer>
                                  <CustomRadioItemLabel>
                                    String
                                  </CustomRadioItemLabel>
                                </CustomRadioItemContainer>
                              </CustomRadioItem>
                              <CustomRadioItem value={"image"}>
                                <CustomRadioItemContainer>
                                  <CustomRadioItemLabel>
                                    Image
                                  </CustomRadioItemLabel>
                                </CustomRadioItemContainer>
                              </CustomRadioItem>
                              <CustomRadioItem value={"category_reference"}>
                                <CustomRadioItemContainer>
                                  <CustomRadioItemLabel>
                                    Category reference
                                  </CustomRadioItemLabel>
                                </CustomRadioItemContainer>
                              </CustomRadioItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {watchDataType === "category_reference" && (
                      <FormField
                        control={addAttributeForm.control}
                        name="referenceFrom"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Category</FormLabel>
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
                                    {field.value
                                      ? allCategoryData.find(
                                          (category) =>
                                            category.id === field.value,
                                        )?.name
                                      : "Select category"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="z-50 p-0">
                                <Command>
                                  <CommandInput placeholder="Search category" />
                                  <CommandEmpty>
                                    No category found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {allCategoryData.map((category) => (
                                      <CommandItem
                                        value={category.name}
                                        key={category.id}
                                        onSelect={() => {
                                          addAttributeForm.setValue(
                                            "referenceFrom",
                                            category.id,
                                          );
                                          addAttributeForm.clearErrors(
                                            "referenceFrom",
                                          );
                                          generateEscEvent();
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            category.id === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {category.name}
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
                    )}
                    <DialogFooter>
                      <Button type="submit">Add</Button>
                    </DialogFooter>
                  </form>
                </Form>
              }
            >
              <Button type="button" variant={"outline"}>
                <Plus className="mr-2 h-5 w-5" />
                Add attribute
              </Button>
            </DialogWithContent>
          </SectionHeaderAction>
        </SectionHeader>
        <FormField
          control={form.control}
          name="otherAttribute"
          render={({ field }) => (
            <div className="flex flex-col gap-4">
              {fields.length !== 0 ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  id="dnd-context"
                >
                  <SortableContext
                    items={fields}
                    strategy={verticalListSortingStrategy}
                  >
                    {fields.map((field, index) => (
                      <AttributeCard
                        key={field.id}
                        id={field.id}
                        type={field.type}
                        name={field.name}
                        referenceFrom={
                          allCategoryData.find(
                            (category) => category.id === field.referenceFrom,
                          )?.name
                        }
                        onDelete={() => onDelete(index)}
                      >
                        <FormField
                          control={form.control}
                          name={`otherAttribute.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="Enter attribute name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </AttributeCard>
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="flex h-20 items-center justify-center">
                  <p className="text-muted-foreground">No attributes yet</p>
                </div>
              )}
              <FormMessage />
            </div>
          )}
        />
        <Button type="submit">
          {type === "create" ? "Create" : "Save changes"}
        </Button>
      </form>
    </Form>
  );
}
