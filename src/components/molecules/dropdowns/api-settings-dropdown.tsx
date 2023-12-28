"use client";
import { DialogWithContent } from "@/components/organisms/dialogs/dialog-with-content";
import { PostActionDialog } from "@/components/organisms/dialogs/post-action-dialog";
import { CodeBlock } from "@/components/templates/code-block";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TDeploymentApiExample } from "@/lib/type";
import { onDialogOpenChange, onDropdownSelect } from "@/lib/utils";
import { AlertCircle, Braces, MoreHorizontal, Replace } from "lucide-react";

type ApiSettingsDropdownProps = {
  deploymentId: string;
  apiExampleData: TDeploymentApiExample;
};

export function ApiSettingsDropdown({
  deploymentId,
  apiExampleData,
}: ApiSettingsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DialogWithContent
          title="API example"
          className="max-w-xl"
          onOpenChange={onDialogOpenChange}
          content={
            <Tabs defaultValue="default" className="overflow-hidden">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="default">Default</TabsTrigger>
                <TabsTrigger value="gateway">Gateway</TabsTrigger>
              </TabsList>
              <TabsContent value="default">
                <CodeBlock
                  code={JSON.stringify(apiExampleData.default, null, 2)}
                  language="json"
                  className="h-80"
                />
              </TabsContent>
              <TabsContent value="gateway">
                <CodeBlock
                  code={JSON.stringify(apiExampleData.gateway, null, 2)}
                  language="json"
                  className="h-80"
                />
              </TabsContent>
            </Tabs>
          }
        >
          <DropdownMenuItem onSelect={onDropdownSelect}>
            <Braces className="h-4 w-4 text-muted-foreground" />
            API example
          </DropdownMenuItem>
        </DialogWithContent>
        <PostActionDialog
          variant="warning"
          icon={<AlertCircle />}
          title="Replace with previous API field"
          description="All fields will be replaced with the API fields from the previous deployment."
          action="replaceWithPreviousApi"
          id={deploymentId}
          onOpenChange={onDialogOpenChange}
        >
          <DropdownMenuItem onSelect={onDropdownSelect}>
            <Replace className="h-4 w-4 text-muted-foreground" />
            Replace with previous API field
          </DropdownMenuItem>
        </PostActionDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
