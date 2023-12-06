import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockProps = React.ComponentPropsWithoutRef<
  typeof SyntaxHighlighter
> & {
  code: string;
  language: string;
};

export function CodeBlock({ code, language, ...props }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-md font-mono">
      <SyntaxHighlighter language={language} style={a11yDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
