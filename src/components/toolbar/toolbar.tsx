import './toolbar.css';

interface ToolbarProps {
  markdown: string;
  onInsert: (before: string, after?: string) => void;
  onExport: () => void;
}

export default function Toolbar({ markdown, onInsert, onExport }: ToolbarProps) {
  const wordCount = markdown.trim() === ""
    ? 0
    : markdown.trim().split(/\s+/).length;

  return (
    <div className="toolbar">
      <div className="toolbar-actions">
        <button onClick={() => onInsert("**", "**")}>B</button>
        <button onClick={() => onInsert("*", "*")}>I</button>
        <button onClick={() => onInsert("# ")}>H1</button>
        <button onClick={() => onInsert("## ")}>H2</button>
        <button onClick={() => onInsert("`", "`")}>Code</button>
        <button onClick={() => onInsert("> ")}>Quote</button>
      </div>

      <div className="toolbar-right">
        <span className="word-count">{wordCount} words</span>
        <button onClick={onExport}>Export .md</button>
      </div>
    </div>
  );
}