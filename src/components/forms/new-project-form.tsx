"use client";
import {
  THttpError,
  TLocation,
  TCreateProjectDetails,
  TTemplate,
} from "@/lib/type";
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
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";

type NewProjectFormProps = {
  template: TTemplate[];
  location: TLocation[];
};

const formSchema = z.object({
  template: z.string(),
  name: z.string().min(1).max(100, { message: "Character limit exceeded" }),
  location: z.string(),
  startedAt: z.date(),
  description: z.string(),
});

export function NewProjectForm({ template, location }: NewProjectFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const createProject = useMutation({
    mutationFn: (data: TCreateProjectDetails) => postData("/project", data),
    onError: (error: THttpError) => {
      // console.log(error.response.data.message);
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
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] overflow-scroll rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    const createProjectData = {
      ...data,
      startedAt: data.startedAt.toISOString(),
    };
    createProject.mutate(createProjectData);
  }
  // const { data: session, status } = useSession();
  // console.log(session);
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
            <FormItem className="flex flex-col">
              <FormLabel>Location</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between p-3 text-base font-normal sm:text-sm",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? location.find(
                            (location) => location.id === field.value,
                          )?.en_name
                        : "Select location"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="h-80 w-80 p-0">
                  <Command>
                    <CommandInput placeholder="Search by district" />
                    <CommandEmpty>No locations found.</CommandEmpty>
                    <ScrollArea>
                      <CommandGroup>
                        {location.map((location) => (
                          <CommandItem
                            value={location.en_name}
                            key={location.id}
                            onSelect={() => {
                              form.setValue("location", location.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                location.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {location.en_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
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
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
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
                <Textarea placeholder="Enter project description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
