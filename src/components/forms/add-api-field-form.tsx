"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { RadioGroup } from "../ui/radio-group";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { generateEscEvent } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/lib/data-fetching";
import { TDeploymentApi, THttpError } from "@/lib/type";
import { toast } from "sonner";

type AddApiFieldFormProps = {
  deploymentId: string;
};

export function AddApiFieldForm({ deploymentId }: AddApiFieldFormProps) {
  const dataType = [
    { label: "String", value: "String" },
    { label: "Number", value: "Number" },
    { label: "Boolean", value: "Boolean" },
    { label: "Date", value: "Date" },
  ];
  const formSchema = z.object({
    name: z.string().min(1),
    dataType: z.enum(["String", "Number", "Boolean", "Date"]),
    description: z.string(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const addApiField = useMutation({
    mutationFn: (data: Omit<TDeploymentApi, "id" | "lock">) =>
      postData(`/phase/${deploymentId}/phaseApi`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to create new field", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Field created successfully");
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
    addApiField.mutate(data);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter field name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select data type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  defaultValue={field.value}
                >
                  {dataType.map((item) => (
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="Enter short description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
