import "github-markdown-css/github-markdown.css";

import { marked } from "marked";

interface PreviewProps {
  markdown: string;
}

export default function Preview({ markdown }: PreviewProps) {
  const html = marked(markdown) as string;

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        flex: 1,
        padding: "2rem",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    />
  );
}