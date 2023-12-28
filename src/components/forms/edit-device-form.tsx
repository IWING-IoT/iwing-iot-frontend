"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { TDevices, THttpError, TUserAccountDetails } from "@/lib/type";
import { patchData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";
import { generateEscEvent } from "@/lib/utils";

type EditDeviceFormProps = {
  deviceData: TDevices;
};

export function EditDeviceForm({ deviceData }: EditDeviceFormProps) {
  const formSchema = z.object({
    name: z.string().min(1),
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: deviceData.name ?? "",
    },
    mode: "onChange",
  });

  const editDevice = useMutation({
    mutationFn: (data: Pick<TDevices, "name">) =>
      patchData(`/device/${deviceData.id}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    generateEscEvent();
    editDevice.mutate(data);
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter device name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
