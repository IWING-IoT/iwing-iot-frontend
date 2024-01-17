import { cn } from "@/lib/utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockProps = React.ComponentPropsWithoutRef<
  typeof SyntaxHighlighter
> & {
  code: string;
  language: string;
  className?: string;
};

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  return (
    <div className={cn("overflow-hidden rounded-md", className)}>
      <SyntaxHighlighter
        language={language}
        style={a11yDark}
        customStyle={{ height: "100%" }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
