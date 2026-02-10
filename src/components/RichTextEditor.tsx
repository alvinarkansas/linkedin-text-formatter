'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { DOMSerializer } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Undo,
  Redo,
  Eraser,
  Copy,
  Check,
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { htmlToUnicode } from '@/utils/unicodeConverter';

interface RichTextEditorProps {
  onUpdate: (html: string) => void;
}

export default function RichTextEditor({ onUpdate }: RichTextEditorProps) {
  const [copied, setCopied] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing your LinkedIn post...',
      }),
    ],
    content: '<p>Start writing and your post will appear here</p><p>Set your text to <strong>bold</strong>, <em>italic</em>, or <s>strike through it</s></p><p>This line will appear below the more...</p>',
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3',
      },
      handleDOMEvents: {
        copy: (view: EditorView, event: ClipboardEvent) => {
          const { from, to } = view.state.selection;
          if (from === to) return false;

          const serializer = DOMSerializer.fromSchema(view.state.schema);
          const fragment = serializer.serializeFragment(
            view.state.doc.slice(from, to).content
          );
          const div = document.createElement('div');
          div.appendChild(fragment);
          const html = div.innerHTML;

          const unicodeText = htmlToUnicode(html);
          event.clipboardData?.setData('text/plain', unicodeText);
          event.preventDefault();
          return true;
        },
      },
    },
    immediatelyRender: false,
  });

  const handleCopy = useCallback(async () => {
    if (!editor) return;

    const html = editor.getHTML();
    const unicodeText = htmlToUnicode(html);

    try {
      await navigator.clipboard.writeText(unicodeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [editor]);

  const toggleList = useCallback(
    (listType: 'bulletList' | 'orderedList') => {
      if (!editor) return;

      // Only split hard breaks when converting TO a list, not when toggling off
      if (!editor.isActive(listType)) {
        const { state } = editor;
        const { from, to } = state.selection;

        // Expand range to cover full parent paragraphs
        const $from = state.doc.resolve(from);
        const $to = state.doc.resolve(to);
        const startPos = $from.start($from.depth);
        const endPos = $to.end($to.depth);

        const hardBreakPositions: number[] = [];
        state.doc.nodesBetween(startPos, endPos, (node, pos) => {
          if (node.type.name === 'hardBreak') {
            hardBreakPositions.push(pos);
          }
        });

        if (hardBreakPositions.length > 0) {
          const tr = state.tr;
          // Process from end to start so earlier positions stay valid
          for (let i = hardBreakPositions.length - 1; i >= 0; i--) {
            const pos = hardBreakPositions[i];
            tr.delete(pos, pos + 1);
            tr.split(pos);
          }
          editor.view.dispatch(tr);
        }
      }

      if (listType === 'bulletList') {
        editor.chain().focus().toggleBulletList().run();
      } else {
        editor.chain().focus().toggleOrderedList().run();
      }
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 flex-wrap">
        <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Clear Formatting"
          >
            <Eraser size={18} />
          </ToolbarButton>
        </div>

        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => toggleList('bulletList')}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => toggleList('orderedList')}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>

      {/* Copy Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check size={18} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy text
            </>
          )}
        </button>
      </div>
    </div>
  );
}
