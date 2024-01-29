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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type BatteryThresholdProps = {
  lastConnectionThreshold: number;
  lastConnectionThresholdUnit: "second" | "minute" | "hour" | "day" | "month";
};

export function LastConnectionThresholdForm({
  lastConnectionThreshold,
  lastConnectionThresholdUnit,
}: BatteryThresholdProps) {
  const formSchema = z.object({
    threshold: z.coerce.number().min(0),
    unit: z.enum(["second", "minute", "hour", "day", "month"]),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (arr: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      arr.forEach((item) => params.set(item.name, item.value));
      return params.toString();
    },
    [searchParams],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threshold: lastConnectionThreshold,
      unit: lastConnectionThresholdUnit,
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    router.push(
      pathname +
        "?" +
        createQueryString([
          { name: "lastConnectionThreshold", value: String(data.threshold) },
          { name: "lastConnectionThresholdUnit", value: data.unit },
        ]),
    );
    generateEscEvent();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-2"
      >
        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="threshold"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor="threshold">
                  Last connection threshold
                </FormLabel>
                <FormControl>
                  <Input
                    id="threshold"
                    placeholder="Enter last connection threshold"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="second">second</SelectItem>
                    <SelectItem value="minute">minute</SelectItem>
                    <SelectItem value="hour">hour</SelectItem>
                    <SelectItem value="day">day</SelectItem>
                    <SelectItem value="month">month</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription>
          Any device that has not communicate within this threshold will be
          displayed.
        </FormDescription>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
