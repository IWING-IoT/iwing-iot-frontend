"use client";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { CodeEditor } from "../atoms/code-editor";
import { MarkdownPreview } from "../atoms/markdown-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
        <TabsContent value="editor">
          <CodeEditor value={value} setValue={setValue} />
        </TabsContent>
        <TabsContent value="preview">
          <MarkdownPreview value={value} />
        </TabsContent>
      </Tabs>
    );
  }
  return (
    <div className="relative flex flex-1 gap-6 [&>*]:flex-1">
      <CodeEditor value={value} setValue={setValue} />
      <MarkdownPreview value={value} />
    </div>
  );
}
