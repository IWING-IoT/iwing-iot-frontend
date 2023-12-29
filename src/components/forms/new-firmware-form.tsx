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
import { RadioGroup } from "../ui/radio-group";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { Separator } from "../ui/separator";
import {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderTextContent,
  SectionHeaderTitle,
} from "../molecules/section-header";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

// Filepond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postFormData } from "@/lib/data-fetching";
import { THttpError } from "@/lib/type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

registerPlugin(FilePondPluginFileValidateType);

export function NewFirmwareForm() {
  const router = useRouter();
  const [file, setFile] = useState<Blob | undefined>(undefined);
  const firmwareTypes = [
    { label: "Source code", value: "source" },
    { label: "Config file", value: "config" },
    { label: "Binary", value: "binary" },
  ];

  const formSchema = z.object({
    name: z.string().min(1),
    type: z.enum(["source", "config", "binary"]),
    file: z
      .any()
      .refine((file) => file !== undefined, { message: "File is required" }),
    versionName: z.string().min(1),
    gitUrl: z.string(),
    versionDescription: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      versionName: "",
      gitUrl: "",
      versionDescription: "",
    },
    mode: "onChange",
  });

  const addFirmware = useMutation({
    mutationFn: (data: FormData) => postFormData(`/firmware`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to add firmware", {
        description: error.response.data.message,
      });
    },

    onSuccess: () => {
      toast.success("Firmware added successfully");
      router.back();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    // console.log(data);
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    formData.append("file", file as Blob);
    addFirmware.mutate(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select firmware type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {firmwareTypes.map((firmware) => (
                    <CustomRadioItem
                      key={firmware.value}
                      value={firmware.value}
                    >
                      <CustomRadioItemContainer>
                        <CustomRadioItemLabel>
                          {firmware.label}
                        </CustomRadioItemLabel>
                      </CustomRadioItemContainer>
                    </CustomRadioItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Firmware name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter firmware name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <SectionHeader>
          <SectionHeaderTextContent>
            <SectionHeaderTitle>First version</SectionHeaderTitle>
            <SectionHeaderDescription>
              Upload your first version of this firmware.
            </SectionHeaderDescription>
          </SectionHeaderTextContent>
        </SectionHeader>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormControl>
                <FilePond
                  id={"file"}
                  {...field}
                  onupdatefiles={(fileItems) => {
                    setFile(fileItems[0]?.file ?? undefined);
                    form.setValue("file", fileItems[0]?.file ?? undefined);
                  }}
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
