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
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { TFirmwareDetails, THttpError } from "@/lib/type";
import { patchData } from "@/lib/data-fetching";
import { toast } from "sonner";

type EditFirmwareFormProps = {
  firmwareId: string;
  firmwareData: TFirmwareDetails;
};

export function EditFirmwareForm({
  firmwareId,
  firmwareData,
}: EditFirmwareFormProps) {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: firmwareData.name ?? "",
      description: firmwareData.description ?? "",
    },
    mode: "onChange",
  });

  const editFirmware = useMutation({
    mutationFn: (data: Pick<TFirmwareDetails, "name" | "description">) =>
      patchData(`/firmware/${firmwareId}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },

    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.push(`/firmware/${firmwareId}`);
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    editFirmware.mutate(data);
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
              <FormLabel htmlFor="name">Firmware name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter firmware name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Firmware description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Enter description"
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
