"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "../ui/radio-group";
import {
  CustomRadioItem,
  CustomRadioItemContainer,
  CustomRadioItemLabel,
} from "../molecules/custom-radio-item";
import { toast } from "sonner";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { TCollaborators, THttpError } from "@/lib/type";
import { patchData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";
import { generateEscEvent } from "@/lib/utils";

const formSchema = z.object({
  permission: z.enum(["can_edit", "can_view"]),
});

type EditPermissionFormProps = {
  collaboratorData: TCollaborators;
};

export function EditPermissionForm({
  collaboratorData,
}: EditPermissionFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permission:
        collaboratorData.permission === "owner"
          ? undefined
          : collaboratorData.permission,
    },
    mode: "onBlur",
  });

  const editPermission = useMutation({
    mutationFn: (data: { permission: string }) =>
      patchData(`/collaborator/${collaboratorData.id}`, data),
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
    editPermission.mutate(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select permission</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  defaultValue={field.value}
                >
                  <CustomRadioItem value={"can_edit"}>
                    <CustomRadioItemContainer>
                      <CustomRadioItemLabel>Can edit</CustomRadioItemLabel>
                    </CustomRadioItemContainer>
                  </CustomRadioItem>
                  <CustomRadioItem value={"can_view"}>
                    <CustomRadioItemContainer>
                      <CustomRadioItemLabel>Can view</CustomRadioItemLabel>
                    </CustomRadioItemContainer>
                  </CustomRadioItem>
                </RadioGroup>
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
