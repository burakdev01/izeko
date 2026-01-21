import { FontSize } from '@/utils/tiptap-font-size';
import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Baseline,
    Bold,
    CheckSquare,
    Code,
    Heading1,
    Heading2,
    Highlighter,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Quote,
    Redo,
    Strikethrough,
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    Table as TableIcon,
    Underline as UnderlineIcon,
    Undo,
    Youtube as YoutubeIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type RichTextEditorProps = {
    value: string;
    onChange: (content: string) => void;
    editable?: boolean;
    placeholder?: string;
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

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
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

    const addYoutube = useCallback(() => {
        const url = window.prompt('YouTube URL:');
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            });
        }
    }, [editor]);

    return (
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
            {/* Undo/Redo */}
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
            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Font Family & Size */}
            <select
                onChange={(event) =>
                    editor
                        .chain()
                        .focus()
                        .setFontFamily(event.target.value)
                        .run()
                }
                value={
                    editor.getAttributes('textStyle').fontFamily ||
                    'Inter, ui-sans-serif, system-ui'
                }
                className="h-8 rounded border border-gray-300 bg-white px-2 py-0 text-xs text-gray-700 outline-none focus:border-[#da1f25] focus:ring-1 focus:ring-[#da1f25]"
                title="Yazı Tipi"
            >
                <option value="Inter, ui-sans-serif, system-ui">
                    Varsayılan
                </option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Times New Roman, serif">Times New Roman</option>
                <option value="Courier New, monospace">Courier New</option>
            </select>

            <select
                onChange={(event) =>
                    editor.chain().focus().setFontSize(event.target.value).run()
                }
                value={editor.getAttributes('textStyle').fontSize || ''}
                className="h-8 w-20 rounded border border-gray-300 bg-white px-2 py-0 text-xs text-gray-700 outline-none focus:border-[#da1f25] focus:ring-1 focus:ring-[#da1f25]"
                title="Yazı Boyutu"
            >
                <option value="">Oto</option>
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="30px">30px</option>
            </select>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Basic Formatting */}
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
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('underline')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Altı Çizili"
            >
                <UnderlineIcon className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('strike')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Üstü Çizili"
            >
                <Strikethrough className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('highlight')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Vurgula"
            >
                <Highlighter className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('codeBlock')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Kod Bloğu"
            >
                <Code className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Colors */}
            <div className="flex items-center gap-1 rounded p-1 hover:bg-gray-200">
                <Baseline className="h-4 w-4 text-gray-600" />
                <input
                    type="color"
                    onInput={(event: any) =>
                        editor
                            .chain()
                            .focus()
                            .setColor(event.target.value)
                            .run()
                    }
                    value={editor.getAttributes('textStyle').color || '#000000'}
                    className="h-4 w-4 cursor-pointer border-0 bg-transparent p-0"
                    title="Yazı Rengi"
                />
            </div>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Script */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('subscript')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Alt Simge"
            >
                <SubscriptIcon className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('superscript')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Üst Simge"
            >
                <SuperscriptIcon className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Headings */}
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

            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Alignment */}
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                }
                className={`rounded p-1.5 transition ${
                    editor.isActive({ textAlign: 'left' })
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Sola Yasla"
            >
                <AlignLeft className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                }
                className={`rounded p-1.5 transition ${
                    editor.isActive({ textAlign: 'center' })
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Ortala"
            >
                <AlignCenter className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                }
                className={`rounded p-1.5 transition ${
                    editor.isActive({ textAlign: 'right' })
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Sağa Yasla"
            >
                <AlignRight className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor.chain().focus().setTextAlign('justify').run()
                }
                className={`rounded p-1.5 transition ${
                    editor.isActive({ textAlign: 'justify' })
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="İki Yana Yasla"
            >
                <AlignJustify className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Lists */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('bulletList')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Madde İşaretleri"
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
                title="Numaralı Liste"
            >
                <ListOrdered className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={`rounded p-1.5 transition ${
                    editor.isActive('taskList')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Görev Listesi"
            >
                <CheckSquare className="h-4 w-4" />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            {/* Inserts */}
            <button
                type="button"
                onClick={addYoutube}
                className={`rounded p-1.5 transition ${
                    editor.isActive('youtube')
                        ? 'bg-red-100 text-red-600'
                        : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="YouTube Video"
            >
                <YoutubeIcon className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={addImage}
                className="rounded p-1.5 text-gray-600 transition hover:bg-gray-200"
                title="Görsel Ekle"
            >
                <ImageIcon className="h-4 w-4" />
            </button>
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

            {/* Table (Simple Toggle) */}
            <div className="mx-1 h-6 w-px bg-gray-300" />
            <button
                type="button"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                        .run()
                }
                className="rounded p-1.5 text-gray-600 transition hover:bg-gray-200"
                title="Tablo Ekle"
            >
                <TableIcon className="h-4 w-4" />
            </button>
        </div>
    );
};

const EditorStatus = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const [, forceUpdate] = useState({});

    useEffect(() => {
        const handleTransaction = () => {
            forceUpdate({});
        };

        editor.on('transaction', handleTransaction);
        editor.on('update', handleTransaction);

        return () => {
            editor.off('transaction', handleTransaction);
            editor.off('update', handleTransaction);
        };
    }, [editor]);

    return (
        <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-400">
            {editor.storage.characterCount?.words() ?? 0} kelime,{' '}
            {editor.storage.characterCount?.characters() ?? 0} karakter
        </div>
    );
};

export default function RichTextEditor({
    value,
    onChange,
    editable = true,
    placeholder = 'İçerik giriniz...',
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Typography,
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#da1f25] underline hover:text-red-700',
                },
            }),
            Underline,
            TextStyle,
            FontFamily,
            FontSize,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Subscript,
            Superscript,
            Youtube.configure({
                controls: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            CharacterCount.configure(),
            Placeholder.configure({
                placeholder: placeholder,
                emptyEditorClass:
                    'cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before-float-left before:pointer-events-none',
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

    if (!editor) {
        return null;
    }

    return (
        <div className="flex w-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm ring-offset-2 focus-within:ring-2 focus-within:ring-[#da1f25] focus-within:ring-offset-2">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="min-h-[150px] flex-1" />
            <EditorStatus editor={editor} />
        </div>
    );
}
