import { useState } from "react";
import Editor from "./components/editor/editor";
import Preview from "./components/preview/preview";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

export default function App() {
  const [markdown, setMarkdown] = useState<string>("# Hello World\n\nStart typing...");
  const debouncedMarkdown = useDebounce<string>(markdown, 300);

  return (
    <div className="app-container">
      <Editor value={markdown} onChange={setMarkdown} />
      <Preview markdown={debouncedMarkdown} />
    </div>
  );
}