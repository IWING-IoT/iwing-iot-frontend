"use client";
import { THttpError, TCreateProjectDetails, TTemplate } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemDescription,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, generateEscEvent } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";

type NewProjectFormProps = {
  template: TTemplate[];
};

const formSchema = z.object({
  template: z.string(),
  name: z.string().min(1).max(100, { message: "Character limit exceeded" }),
  location: z.string().min(1),
  startedAt: z.date(),
});

export function NewProjectForm({ template }: NewProjectFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
    },
    mode: "onChange",
  });

  const createProject = useMutation({
    mutationFn: (data: Omit<TCreateProjectDetails, "description">) =>
      postData("/project", data),
    onError: (error: THttpError) => {
      toast.error("Unable to create project", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.push("/home");
      router.refresh();
      toast.success("Project created successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const createProjectData = {
      ...data,
      startedAt: data.startedAt.toISOString(),
    };
    createProject.mutate(createProjectData);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select template</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {template.map((template) => (
                    <CustomRadioItem key={template.id} value={template.id}>
                      <CustomRadioItemContainer>
                        <CustomRadioItemLabel>
                          {template.name}
                        </CustomRadioItemLabel>
                        <CustomRadioItemDescription>
                          {template.description}
                        </CustomRadioItemDescription>
                      </CustomRadioItemContainer>
                    </CustomRadioItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Project name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Max 100 characters</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="location">Location</FormLabel>
              <FormControl>
                <Input id="location" placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left text-base font-normal sm:text-sm",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "d MMMM yyyy")
                      ) : (
                        <span>Select start date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => {
                      field.onChange(e);
                      generateEscEvent();
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
