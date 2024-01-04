import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeRaw from "rehype-raw";

type MarkdownPreviewProps = {
  value: string;
};

export function MarkdownPreview({ value }: MarkdownPreviewProps) {
  return (
    <Markdown
      className="prose min-h-[20rem] max-w-full dark:prose-invert"
      rehypePlugins={[rehypeRaw]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              children={children ? String(children).replace(/\n$/, "") : ""}
              language={match[1]}
              style={a11yDark}
              customStyle={{
                padding: 0,
                background: "none",
              }}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {value}
    </Markdown>
  );
}
