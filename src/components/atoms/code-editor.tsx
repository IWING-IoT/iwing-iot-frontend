"use client";
import Editor from "react-simple-code-editor";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";

type CodeEditorProps = {
  value: string;
  setValue: (value: string) => void;
};

export function CodeEditor({ value, setValue }: CodeEditorProps) {
  const { theme = "system", systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");
  return (
    <Editor
      value={value}
      onValueChange={(code) => setValue(code)}
      highlight={(code) => (
        <SyntaxHighlighter
          language={"markdown"}
          style={isDark ? a11yDark : a11yLight}
          wrapLines
          wrapLongLines
          customStyle={{
            padding: 0,
            background: "none",
          }}
        >
          {code}
        </SyntaxHighlighter>
      )}
      className="h-full font-mono text-sm"
      textareaClassName="focus:outline-none"
    />
  );
}
