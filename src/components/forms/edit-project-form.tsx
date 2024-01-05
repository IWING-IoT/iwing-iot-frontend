"use client";
import { THttpError, TCreateProjectDetails, TProjectDetails } from "@/lib/type";
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
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, formatDate, generateEscEvent } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { patchData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";

type EditProjectFormProps = {
  projectId: string;
  projectData: TProjectDetails;
};

const formSchema = z.object({
  name: z.string().min(1).max(100, { message: "Character limit exceeded" }),
  location: z.string().min(1),
  startedAt: z.date(),
});

export function EditProjectForm({
  projectId,
  projectData,
}: EditProjectFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: projectData.name,
      location: projectData.location,
      startedAt: new Date(projectData.startedAt),
    },
    mode: "onChange",
  });

  const editProject = useMutation({
    mutationFn: (
      data: Omit<TCreateProjectDetails, "template" | "description">,
    ) => patchData(`/project/${projectId}`, data),
    onError: (error: THttpError) => {
      // console.log(error.response.data.message);
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.push(`/project/${projectId}/deployments`);
      router.refresh();
      toast.success("Changes saved successfully");
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
    editProject.mutate(createProjectData);
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
                        formatDate(field.value.toISOString())
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
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
