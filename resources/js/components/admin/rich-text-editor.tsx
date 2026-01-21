import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Heading1,
    Heading2,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Quote,
    Redo,
    Strikethrough,
    Undo,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type RichTextEditorProps = {
    value: string;
    onChange: (content: string) => void;
    editable?: boolean;
};

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const [, forceUpdate] = useState({});

    useEffect(() => {
        if (!editor) return;

        const handleTransaction = () => {
            forceUpdate({});
        };

        editor.on('transaction', handleTransaction);
        return () => {
            editor.off('transaction', handleTransaction);
        };
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL:', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Görsel URL:');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    return (
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('bold')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Kalın"
            >
                <Bold className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('italic')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="İtalik"
            >
                <Italic className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('strike')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Üstü Çizili"
            >
                <Strikethrough className="h-4 w-4" />
            </button>
            <div className="mx-1 h-6 w-px bg-gray-300" />
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`rounded p-1.5 transition ${
                    editor.isActive('heading', { level: 1 })
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Başlık 1"
            >
                <Heading1 className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`rounded p-1.5 transition ${
                    editor.isActive('heading', { level: 2 })
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Başlık 2"
            >
                <Heading2 className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('bulletList')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Liste"
            >
                <List className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('orderedList')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Sıralı Liste"
            >
                <ListOrdered className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('blockquote')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Alıntı"
            >
                <Quote className="h-4 w-4" />
            </button>
            <div className="mx-1 h-6 w-px bg-gray-300" />
            <button
                type="button"
                onClick={setLink}
                className={`rounded p-1.5 transition ${
                    editor.isActive('link')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Link Ekle"
            >
                <LinkIcon className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={addImage}
                className="rounded p-1.5 text-gray-600 transition hover:bg-gray-200"
                title="Görsel Ekle"
            >
                <ImageIcon className="h-4 w-4" />
            </button>
            <div className="mx-1 h-6 w-px bg-gray-300" />
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="rounded p-1.5 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
                title="Geri Al"
            >
                <Undo className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="rounded p-1.5 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
                title="İleri Al"
            >
                <Redo className="h-4 w-4" />
            </button>
        </div>
    );
};

export default function RichTextEditor({
    value,
    onChange,
    editable = true,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#da1f25] underline hover:text-red-700',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
        ],
        content: value,
        editable: editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base prose-strong:font-bold prose-h1:mb-3 prose-h2:mb-3 font-normal m-5 focus:outline-none max-w-none min-h-[150px]',
            },
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML() && !editor.isFocused) {
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [value, editor]);

    return (
        <div className="w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm ring-offset-2 focus-within:ring-2 focus-within:ring-[#da1f25] focus-within:ring-offset-2">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
