"use client";
import { TTemplate } from "@/lib/type";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export default function NewProjectForm({
  template,
}: {
  template: TTemplate[];
}) {
  const templateNames = template.map((template) => template.name);
  console.log(templateNames);
  const formSchema = z.object({
    type: z.enum(["Other", ...templateNames], {
      required_error: "You need to select a template.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
            <FormItem className="flex flex-1 flex-col">
              <FormLabel>Select template</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {template.map((template) => (
                    <FormItem
                      className="flex flex-1 items-center space-x-3 space-y-0"
                      key={template.id}
                    >
                      <FormLabel className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border-2 border-muted bg-popover p-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <FormControl>
                          <RadioGroupItem
                            value={template.name}
                            className="peer"
                          />
                        </FormControl>
                        {template.name}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
