"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

// Filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import { useMutation } from "@tanstack/react-query";
import { postFormData } from "@/lib/data-fetching";
import { THttpError } from "@/lib/type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

registerPlugin(FilePondPluginFileValidateType);

type NewFirmwareVersionForm = {
  firmwareId: string;
};

export function NewFirmwareVersionForm({ firmwareId }: NewFirmwareVersionForm) {
  const router = useRouter();
  const gitCommitUrlRegex =
    /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/commit\/[0-9a-f]{40}$/;

  const formSchema = z.object({
    file: z
      .any()
      .refine((file) => file !== undefined, { message: "File is required" }),
    versionName: z.string().min(1),
    gitUrl: z
      .string()
      .refine((url) => (url !== "" ? gitCommitUrlRegex.test(url) : true), {
        message: "A Git commit URL should end with a 40-character commit hash.",
      }),
    versionDescription: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      versionName: "",
      gitUrl: "",
      versionDescription: "",
    },
    mode: "onChange",
  });

  const addFirmwareVersion = useMutation({
    mutationFn: (data: FormData) =>
      postFormData(`/firmware/${firmwareId}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to add new version", {
        description: error.response.data.message,
      });
    },

    onSuccess: () => {
      toast.success("New version added successfully");
      router.push(`/firmware/${firmwareId}`);
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    // console.log(data);
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    addFirmwareVersion.mutate(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormControl>
                <FilePond
                  id={"file"}
                  onupdatefiles={(fileItems) => {
                    form.setValue("file", fileItems[0]?.file ?? undefined);
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}
