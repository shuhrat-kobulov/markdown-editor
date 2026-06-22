import { marked } from "marked";
import './preview.css'

interface PreviewProps {
  markdown: string;
}

export default function Preview({ markdown }: PreviewProps) {
  const html = marked(markdown) as string;

  return (
    <div
      className="preview-pane"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}