import { patchData } from "@/lib/data-fetching";
import { TDeploymentApi, THttpError } from "@/lib/type";
import { generateEscEvent } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

type EditApiFieldFormProps = {
  fieldData: TDeploymentApi;
};

export function EditApiFieldForm({ fieldData }: EditApiFieldFormProps) {
  const formSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: fieldData.name ?? "",
      description: fieldData.description ?? "",
    },
    mode: "onChange",
  });

  const editApiField = useMutation({
    mutationFn: (data: Omit<TDeploymentApi, "id" | "dataType">) =>
      patchData(`/phaseApi/${fieldData.id}`, data),
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(data);
    editApiField.mutate(data);
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
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
