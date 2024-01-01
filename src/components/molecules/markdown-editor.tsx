import { CodeEditor } from "../atoms/code-editor";
import { MarkdownPreview } from "../atoms/markdown-preview";

type MarkDownEditorProps = {
  value: string;
  setValue: (value: string) => void;
};

export function MarkDownEditor({ value, setValue }: MarkDownEditorProps) {
  return (
    <div className="relative flex flex-1 gap-6 [&>*]:flex-1">
      <CodeEditor value={value} setValue={setValue} />
      <MarkdownPreview value={value} />
    </div>
  );
}
