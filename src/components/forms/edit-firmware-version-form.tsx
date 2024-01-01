"use client";
import { patchFormData } from "@/lib/data-fetching";
import { TFirmwareVersionDetails, THttpError } from "@/lib/type";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

type EditFirmwareVersionFormProps = {
  firmwareId: string;
  versionId: string;
  firmwareVersionData: TFirmwareVersionDetails;
};

export function EditFirmwareVersionForm({
  firmwareId,
  versionId,
  firmwareVersionData,
}: EditFirmwareVersionFormProps) {
  const router = useRouter();
  const formSchema = z.object({
    versionName: z.string().min(1),
    gitUrl: z.string(),
    versionDescription: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      versionName: firmwareVersionData.name ?? "",
      gitUrl: firmwareVersionData.gitUrl ?? "",
      versionDescription: firmwareVersionData.description ?? "",
    },
    mode: "onChange",
  });
  const editFirmwareVersion = useMutation({
    mutationFn: (data: FormData) =>
      patchFormData(`/firmwareVersion/${versionId}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.push(`/firmware/${firmwareId}/version/${versionId}/code`);
      router.refresh();
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    editFirmwareVersion.mutate(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="versionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="versionName">Version name</FormLabel>
              <FormControl>
                <Input
                  id="versionName"
                  placeholder="Enter version name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gitUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="gitUrl">Git commit URL</FormLabel>
              <FormControl>
                <Input
                  id="gitUrl"
                  placeholder="Enter git commit URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="versionDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="versionDescription">
                Version description
              </FormLabel>
              <FormControl>
                <Textarea
                  id="versionDescription"
                  placeholder="Enter version description"
                  {...field}
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
