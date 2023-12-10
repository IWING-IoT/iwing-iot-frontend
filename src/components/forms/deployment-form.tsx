"use client";
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
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TDeploymentDetails, THttpError } from "@/lib/type";

type DeploymentFormProps = {
  projectId: string;
  submitLabel: string;
};

const formSchema = z.object({
  name: z.string().min(1).max(100, { message: "Character limit exceeded" }),
  startedAt: z.date(),
  description: z.string(),
});

export function DeploymentForm({
  projectId,
  submitLabel,
}: DeploymentFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const createDeployment = useMutation({
    mutationFn: (data: TDeploymentDetails) =>
      postData(`/project/${projectId}/phase`, data),
    onError: (error: THttpError) => {
      // console.log(error.response.data.message);
      toast.error("Unable to create deployment", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.push(`/project/${projectId}/deployments`);
      router.refresh();
      toast.success("Deployment created successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const createDeploymentData = {
      ...data,
      startedAt: data.startedAt.toISOString(),
    };
    createDeployment.mutate(createDeploymentData);
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
              <FormLabel htmlFor="name">Deployment name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter deployment name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Max 100 characters</FormDescription>
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
                <Textarea
                  placeholder="Enter deployment description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Form>
  );
}
