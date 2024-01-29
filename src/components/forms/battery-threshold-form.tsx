"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateEscEvent } from "@/lib/utils";
import { useCallback } from "react";

type BatteryThresholdProps = {
  batteryThreshold: number;
};

export function BatteryThresholdForm({
  batteryThreshold,
}: BatteryThresholdProps) {
  const formSchema = z.object({
    threshold: z.coerce.number().min(0).max(100),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threshold: batteryThreshold,
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    router.push(
      pathname +
        "?" +
        createQueryString("batteryThreshold", String(data.threshold)),
    );
    generateEscEvent();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="threshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="threshold">Battery threshold</FormLabel>
              <FormControl>
                <Input
                  id="threshold"
                  placeholder="Enter battery threshold"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Any battery level below this threshold will be displayed.
              </FormDescription>
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
