"use client";
import { putData } from "@/lib/data-fetching";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  TAllEntryInProject,
  TDeploymentDeviceDetails,
  TEntry,
  THttpError,
} from "@/lib/type";
import MultipleSelector, { Option } from "../organisms/multiple-selector";

type EditDeploymentDeviceFormProps = {
  deviceData: TDeploymentDeviceDetails;
  allEntryInProject: TAllEntryInProject[];
};

function generateOptions(allEntryInProject: TAllEntryInProject[]) {
  const options: Option[] = [];
  allEntryInProject.forEach((category) => {
    category.entry.forEach((entry) => {
      options.push({
        label: entry.name,
        value: entry.id,
        group: category.name,
      });
    });
  });
  return options;
}

export function EditDeploymentDeviceForm({
  deviceData,
  allEntryInProject,
}: EditDeploymentDeviceFormProps) {
  const formSchema = z.object({
    alias: z.string().min(1),
    associate: z.array(z.object({ label: z.string(), value: z.string() })),
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alias: deviceData.alias ?? "",
      associate: deviceData.associate.map((associate) => {
        return { value: associate.id, label: associate.name };
      }),
    },
    mode: "onChange",
  });

  const editDevice = useMutation({
    mutationFn: (data: { alias: string; associate: string[] }) =>
      putData(`/devicePhase/${deviceData.id}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.back();
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const deviceData = {
      alias: data.alias,
      associate: data.associate.map((associate) => associate.value),
    };
    editDevice.mutate(deviceData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="alias">Alias</FormLabel>
              <FormControl>
                <Input id="alias" placeholder="Enter device name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="associate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Association</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={generateOptions(allEntryInProject)}
                  placeholder="Select device association"
                  emptyIndicator={"No results found."}
                  groupBy="group"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
