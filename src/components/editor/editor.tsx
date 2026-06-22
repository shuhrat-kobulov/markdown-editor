import './editor.css';

import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        viewRef.current = new EditorView({
            doc: value,
            extensions: [
                basicSetup,
                markdown(),
                oneDark,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        onChange(update.state.doc.toString());
                    }
                }),
            ],
            parent: containerRef.current,
        });

        return () => viewRef.current?.destroy();
    }, []);

    return <div ref={containerRef} className="editor-pane" />;
}
