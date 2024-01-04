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

type EditUserAccountFormProps = {
  userData: Omit<TUserAccountDetails, "password">;
};

export function EditUserAccountForm({ userData }: EditUserAccountFormProps) {
  const formSchema = z.object({
    role: z.enum(["admin", "user"]),
    name: z.string().min(1),
    email: z.string().email({ message: "Please enter a valid email address" }),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: userData.role,
      name: userData.name,
      email: userData.email,
    },
    mode: "onBlur",
  });

  const editAccount = useMutation({
    mutationFn: (data: Omit<TUserAccountDetails, "id" | "password">) =>
      patchData(`/admin/account/${userData.id}`, data),
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
    generateEscEvent();
    editAccount.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  defaultValue={field.value}
                >
                  <CustomRadioItem value={"admin"}>
                    <CustomRadioItemContainer>
                      <CustomRadioItemLabel>Admin</CustomRadioItemLabel>
                    </CustomRadioItemContainer>
                  </CustomRadioItem>
                  <CustomRadioItem value={"user"}>
                    <CustomRadioItemContainer>
                      <CustomRadioItemLabel>User</CustomRadioItemLabel>
                    </CustomRadioItemContainer>
                  </CustomRadioItem>
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
                <Input
                  id="name"
                  placeholder="Enter name"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  autoComplete="email"
                  {...field}
                />
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
