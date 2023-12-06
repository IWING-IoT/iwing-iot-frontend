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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { RadioGroup } from "../ui/radio-group";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { THttpError, TCreateUserAccountDetails } from "@/lib/type";
import { postData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";

type UserAccountFormProps = {
  submitLabel: string;
};

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8).max(30),
  role: z.enum(["admin", "user"]),
});

export function UserAccountForm({ submitLabel }: UserAccountFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const createAccount = useMutation({
    mutationFn: (data: TCreateUserAccountDetails) =>
      postData("/admin/account", data),
    onError: (error: THttpError) => {
      // console.log(error.response.data.message);
      toast.error("Unable to create account", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      // Close dialog
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      router.refresh();
      toast.success("Account created successfully");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createAccount.mutate(data);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    autoComplete="new-password"
                    {...field}
                  />
                  <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground">
                    {showPassword ? (
                      <EyeOff
                        className="h-5 w-5"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Eye
                        className="h-5 w-5"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">{submitLabel}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
