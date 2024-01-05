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
import { cn, generateEscEvent } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { patchData, postData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TDeploymentDetails, THttpError } from "@/lib/type";
import { DialogFooter } from "../ui/dialog";

type DeploymentFormProps =
  | {
      type: "create";
      projectId: string;
      deploymentData?: never;
    }
  | {
      type: "edit";
      projectId?: never;
      deploymentData: TDeploymentDetails;
    };

const formSchema = z.object({
  name: z.string().min(1).max(100, { message: "Character limit exceeded" }),
  startedAt: z.date(),
});

export function DeploymentForm({
  type,
  projectId,
  deploymentData,
}: DeploymentFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === "edit" ? deploymentData.name : "",
      startedAt:
        type === "edit" ? new Date(deploymentData.startedAt) : undefined,
    },
    mode: "onChange",
  });

  const createDeployment = useMutation({
    mutationFn: (data: Pick<TDeploymentDetails, "name" | "startedAt">) =>
      postData(`/project/${projectId}/phase`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to create deployment", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Deployment created successfully");
    },
  });

  const editDeployment = useMutation({
    mutationFn: (data: Pick<TDeploymentDetails, "name" | "startedAt">) =>
      patchData(`/phase/${deploymentData?.id}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      router.refresh();
      toast.success("Changes saved successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const deploymentData = {
      ...data,
      startedAt: data.startedAt.toISOString(),
    };
    generateEscEvent();
    if (type === "edit") {
      editDeployment.mutate(deploymentData);
    } else {
      createDeployment.mutate(deploymentData);
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
        <DialogFooter>
          <Button type="submit">
            {type === "edit" ? "Save changes" : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
