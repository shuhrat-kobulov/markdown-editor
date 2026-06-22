import './app.css';

import { useState, useEffect, useRef } from 'react';

import Editor, { type EditorHandle } from './components/editor/editor';
import Preview from './components/preview/preview';
import Toolbar from './components/toolbar/toolbar';
import { useDebounce } from './hooks/useDebounce';

const STORAGE_KEY = 'md-editor-content';

const defaultContent = '# Hello World\n\nStart typing...';

export default function App() {
    const [markdown, setMarkdown] = useState<string>(() => {
        // Load saved content on first render
        return localStorage.getItem(STORAGE_KEY) ?? defaultContent;
    });

    const debouncedMarkdown = useDebounce<string>(markdown, 300);
    const editorRef = useRef<EditorHandle>(null);

    // Save whenever markdown changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, markdown);
    }, [markdown]);

    const handleInsert = (before: string, after: string = '') => {
        editorRef.current?.insert(before, after);
    };

    const handleExport = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="app-wrapper">
            <Toolbar
                markdown={markdown}
                onInsert={handleInsert}
                onExport={handleExport}
            />
            <div className="app-container">
                <Editor ref={editorRef} value={markdown} onChange={setMarkdown} />
                <Preview markdown={debouncedMarkdown} />
            </div>
        </div>
    );
}
