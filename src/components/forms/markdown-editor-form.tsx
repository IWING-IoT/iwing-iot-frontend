"use client";
import { AlertCircle } from "lucide-react";
import {
  Header,
  HeaderActions,
  HeaderContent,
  HeaderTitle,
  HeaderTitleAndSupporting,
} from "../molecules/header";
import { AlertDialog } from "../organisms/dialogs/alert-dialog";
import { Form, FormField } from "../ui/form";
import { Button } from "../ui/button";
import { MainContainer } from "../templates/main-container";
import { MarkDownEditor } from "../molecules/markdown-editor";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { THttpError } from "@/lib/type";
import { patchData, patchFormData } from "@/lib/data-fetching";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

type MarkdownEditorFormProps = {
  id: string;
  type: "firmwareDocument" | "projectDocument" | "deploymentDocument";
  redirectTo: string;
  markdownData: string;
  title: string;
};

export function MarkdownEditorForm({
  id,
  type,
  redirectTo,
  markdownData,
  title,
}: MarkdownEditorFormProps) {
  const router = useRouter();

  const formSchema = z.object({
    markdown: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      markdown: markdownData ?? "",
    },
    mode: "onChange",
  });

  const editFirmwareMarkdown = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      return patchFormData(`firmwareVersion/${id}`, formData);
    },
    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.push(redirectTo);
      router.refresh();
    },
  });

  const editProjectMarkdown = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      patchData(`project/${id}`, { description: data.markdown }),

    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.push(redirectTo);
      router.refresh();
    },
  });

  const editDeploymentMarkdown = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      patchData(`phase/${id}`, { description: data.markdown }),

    onError: (error: THttpError) => {
      toast.error("Unable to save changes", {
        description: error.response.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      router.push(redirectTo);
      router.refresh();
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    switch (type) {
      case "firmwareDocument":
        return editFirmwareMarkdown.mutate(data);
      case "projectDocument":
        return editProjectMarkdown.mutate(data);
      case "deploymentDocument":
        return editDeploymentMarkdown.mutate(data);
    }
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-1 flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Header>
          <HeaderContent>
            <HeaderTitleAndSupporting>
              <HeaderTitle>{title}</HeaderTitle>
            </HeaderTitleAndSupporting>
            <HeaderActions>
              <AlertDialog
                variant="warning"
                icon={<AlertCircle />}
                title="Discard changes"
                description="This action can't be undone. You'll lose all the changes you've made."
                submitButton={
                  <Button className="flex-1" asChild>
                    <Link href={redirectTo}>Discard</Link>
                  </Button>
                }
              >
                <Button variant={"outline"}>Discard</Button>
              </AlertDialog>
              <Button type="submit">Save changes</Button>
            </HeaderActions>
          </HeaderContent>
        </Header>
        <MainContainer>
          <FormField
            control={form.control}
            name="markdown"
            render={({ field }) => (
              <MarkDownEditor value={field.value} setValue={field.onChange} />
            )}
          />
        </MainContainer>
      </form>
    </Form>
  );
}
