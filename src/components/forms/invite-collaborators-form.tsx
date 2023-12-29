"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Delimiter, Tag, TagInput } from "../organisms/tags-input";
import { useState } from "react";
import { toast } from "sonner";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { THttpError, TInviteCollaborators } from "@/lib/type";
import { postData } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { showDialogAtom } from "@/store/atoms";
import { CodeBlock } from "../atoms/code-block";

const formSchema = z.object({
  permission: z.enum(["can_edit", "can_view"]),
  email: z
    .array(
      z.object({
        id: z.string(),
        text: z
          .string()
          .email({ message: "Please enter a valid email address" }),
      }),
    )
    .min(1, {
      message:
        "Please add at least one email address by typing it and pressing 'Enter'",
    }),
});

const emailSchema = z.string().email();

type InviteCollaboratorsFormProps = {
  projectId: string;
};

export function InviteCollaboratorsForm({
  projectId,
}: InviteCollaboratorsFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: [],
    },
    mode: "onBlur",
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [showDialog, setShowDialog] = useAtom(showDialogAtom);

  const { setValue } = form;

  const inviteCollaborators = useMutation({
    mutationFn: (data: TInviteCollaborators) =>
      postData(`/project/${projectId}/collaborator`, data),
    onError: (error: THttpError) => {
      // console.log(error.response.data.message);
      toast.error("Unable to invite collaborators", {
        description: error.response.data.message,
      });
    },
    onSuccess: (response) => {
      const escEvent = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(escEvent);
      router.refresh();
      if (response.invalidCollaborator.length > 0) {
        toast.error("Some collaborators were not invited", {
          action: {
            label: "Details",
            onClick: () =>
              setShowDialog({
                show: true,
                title: "Error details",
                children: (
                  <CodeBlock
                    code={JSON.stringify(response, null, 2)}
                    language="json"
                  />
                ),
              }),
          },
        });
      } else {
        toast.success("Collaborators invited successfully");
      }
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const inviteCollaboratorsData = data.email.map((email) => ({
      email: email.text,
      permission: data.permission,
    }));
    inviteCollaborators.mutate(inviteCollaboratorsData);
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Collaborator emails</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Enter collaborator email"
                  tags={tags}
                  setTags={(newTags) => {
                    setTags(newTags);
                    setValue("email", newTags as Tag[]);
                  }}
                  textCase={"lowercase"}
                  shape={"pill"}
                  minTags={1}
                  delimiterList={[
                    Delimiter.Enter,
                    Delimiter.Comma,
                    Delimiter.Space,
                  ]}
                  showCount={true}
                  validateTag={(tag) => {
                    const { success } = emailSchema.safeParse(tag);
                    if (!success) {
                      form.setError("email", {
                        type: "manual",
                        message: "Please enter a valid email address",
                      });
                      return false;
                    }
                    return true;
                  }}
                  inputProps={{
                    type: "email",
                    autoComplete: "email",
                    autoCapitalize: "none",
                    autoCorrect: "off",
                  }}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Type each email address and press 'Enter' or 'Return'.
              </FormDescription>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Invite</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
