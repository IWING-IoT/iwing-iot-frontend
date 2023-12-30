"use client";
import { useTheme } from "next-themes";
import ReactDiffViewer from "react-diff-viewer-continued";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import useMediaQuery from "beautiful-react-hooks/useMediaQuery";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type DiffViewerProps = {
  oldCode: string;
  newCode: string;
  language: string;
};

export function DiffViewer({ oldCode, newCode, language }: DiffViewerProps) {
  const { theme = "system", systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <div className="overflow-hidden rounded-md border">
      <ScrollArea>
        <ReactDiffViewer
          oldValue={oldCode}
          newValue={newCode}
          useDarkTheme={isDark}
          renderContent={(code) => (
            <SyntaxHighlighter
              language={language}
              style={isDark ? a11yDark : a11yLight}
              customStyle={{
                padding: 0,
                background: "none",
                fontSize: "0.875rem",
              }}
            >
              {code}
            </SyntaxHighlighter>
          )}
          splitView={!isMobile}
          styles={{
            variables: {
              light: {
                diffViewerBackground: "none",
                addedGutterBackground: "#CBFFD8",
                addedBackground: "#E6FFEB",
                wordAddedBackground: "#b5fdc7",
                removedGutterBackground: "#FFD6D5",
                removedBackground: "#FEF0ED",
                wordRemovedBackground: "#FFD6D5",
              },
              dark: {
                diffViewerBackground: "none",
                addedGutterBackground: "#1D4428",
                addedBackground: "#12271E",
                wordAddedBackground: "#1F572C",
                removedGutterBackground: "#542527",
                removedBackground: "#25191C",
                wordRemovedBackground: "#7A2F2E",
              },
            },
            lineNumber: {
              color: "hsl(var(--foreground))",
            },
          }}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
