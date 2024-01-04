"use client";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { CodeEditor } from "../atoms/code-editor";
import { MarkdownPreview } from "../atoms/markdown-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type MarkDownEditorProps = {
  value: string;
  setValue: (value: string) => void;
};

export function MarkDownEditor({ value, setValue }: MarkDownEditorProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) {
    return (
      <Tabs defaultValue="editor">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="rounded-md border p-4">
          <CodeEditor value={value} setValue={setValue} />
        </TabsContent>
        <TabsContent value="preview" className="rounded-md border p-4">
          <MarkdownPreview value={value} />
        </TabsContent>
      </Tabs>
    );
  }
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="rounded-l-md border p-4">
        <CodeEditor value={value} setValue={setValue} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="rounded-r-md border p-4">
        <MarkdownPreview value={value} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
