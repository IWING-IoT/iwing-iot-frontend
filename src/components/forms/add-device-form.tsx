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
import { RadioGroup } from "../ui/radio-group";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { THttpError, TUserAccountDetails } from "@/lib/type";
import { patchData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";
import { generateEscEvent } from "@/lib/utils";

export function AddDeviceForm() {
  const deviceType = [
    { label: "Standalone", value: "standalone" },
    { label: "Gateway", value: "gateway" },
    { label: "Node", value: "node" },
  ];
  const formSchema = z.object({
    type: z.enum(["standalone", "gateway", "node"]),
    name: z.string().min(1),
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    mode: "onBlur",
  });

  //   const editAccount = useMutation({
  //     mutationFn: (data: Omit<TUserAccountDetails, "id" | "password">) =>
  //       patchData(`/admin/account/${userData.id}`, data),
  //     onError: (error: THttpError) => {
  //       toast.error("Unable to save changes", {
  //         description: error.response.data.message,
  //       });
  //     },
  //     onSuccess: () => {
  //       // Close dialog
  //       const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
  //       document.dispatchEvent(escEvent);
  //       router.refresh();
  //       toast.success("Changes saved successfully");
  //     },
  //   });

  function onSubmit(data: z.infer<typeof formSchema>) {
    //   editAccount.mutate(data);
    generateEscEvent();
    console.log(data);
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
              <FormLabel>Select type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  defaultValue={field.value}
                >
                  {deviceType.map((item) => (
                    <CustomRadioItem key={item.value} value={item.value}>
                      <CustomRadioItemContainer>
                        <CustomRadioItemLabel>
                          {item.label}
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
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter device name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
