"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8).max(30),
});

export default function SignInForm() {
  const router = useRouter();
  const [alert, setAlert] = useState({ show: false, status: 401 });
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password } = data;

    const signInResult = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/home?sortBy=ascending",
      redirect: false,
    });

    if (signInResult?.error) {
      // toast({ description: "Failed to sign in" });
      setAlert({ show: true, status: signInResult.status });
    } else {
      router.refresh();
    }
  }

  return (
    <>
      {alert.show && (
        <Alert variant={"destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            {alert.status === 401
              ? "Your email or password is incorrect"
              : "Failed to sign in."}
          </AlertTitle>
          <AlertDescription>
            {alert.status === 401
              ? "Recheck your email and password and try again."
              : "Don't worry! let's try signing in again."}
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-6 self-stretch"
        >
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
                    placeholder="Enter your email"
                    autoComplete="email"
                    autoFocus
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
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
          <Button type="submit" className="self-stretch">
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
}
