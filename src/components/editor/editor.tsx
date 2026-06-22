import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

export interface EditorHandle {
    insert: (before: string, after?: string) => void;
}

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

const Editor = forwardRef<EditorHandle, EditorProps>(
    ({ value, onChange }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const viewRef = useRef<EditorView | null>(null);

        useImperativeHandle(ref, () => ({
            insert(before: string, after: string = '') {
                const view = viewRef.current;
                if (!view) return;

                const { from, to } = view.state.selection.main;
                const selectedText = view.state.sliceDoc(from, to);

                view.dispatch({
                    changes: {
                        from,
                        to,
                        insert: `${before}${selectedText}${after}`,
                    },
                    selection: {
                        anchor:
                            from +
                            before.length +
                            selectedText.length +
                            after.length,
                    },
                });

                view.focus();
            },
        }));

        useEffect(() => {
            if (!containerRef.current) return;

            viewRef.current = new EditorView({
                doc: value,
                extensions: [
                    basicSetup,
                    markdown(),
                    oneDark,
                    EditorView.theme({
                        '&': { height: '100%' },
                        '.cm-scroller': { overflow: 'auto' },
                    }),
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

        return (
            <div
                ref={containerRef}
                style={{ flex: 1, overflow: 'auto', height: '100%' }}
            />
        );
    },
);

Editor.displayName = 'Editor';
export default Editor;
