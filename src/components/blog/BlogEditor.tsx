import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";

interface BlogEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  value,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "min-h-[350px] px-5 py-4 outline-none prose prose-lg max-w-none focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL",
      previousUrl || "https://"
    );

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/20">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">

        {/* Undo */}
        <button
          type="button"
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Undo2 size={18} />
        </button>

        {/* Redo */}
        <button
          type="button"
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Redo2 size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-300" />

        {/* Bold */}
        <button
          type="button"
          title="Bold"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("bold")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Bold size={18} />
        </button>

        {/* Italic */}
        <button
          type="button"
          title="Italic"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("italic")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Italic size={18} />
        </button>

        {/* Strike */}
        <button
          type="button"
          title="Strikethrough"
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("strike")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Strikethrough size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-300" />

        {/* Heading 1 */}
        <button
          type="button"
          title="Heading 1"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 1 })
              .run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("heading", { level: 1 })
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Heading1 size={18} />
        </button>

        {/* Heading 2 */}
        <button
          type="button"
          title="Heading 2"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("heading", { level: 2 })
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Heading2 size={18} />
        </button>

        {/* Heading 3 */}
        <button
          type="button"
          title="Heading 3"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("heading", { level: 3 })
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Heading3 size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-300" />

        {/* Bullet List */}
        <button
          type="button"
          title="Bullet List"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("bulletList")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <List size={18} />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          title="Numbered List"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("orderedList")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <ListOrdered size={18} />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          title="Quote"
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("blockquote")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Quote size={18} />
        </button>

        {/* Code */}
        <button
          type="button"
          title="Code"
          onClick={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }
          className={`rounded-lg p-2 transition ${editor.isActive("codeBlock")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <Code size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-300" />

        {/* Link */}
        <button
          type="button"
          title="Add Link"
          onClick={setLink}
          className={`rounded-lg p-2 transition ${editor.isActive("link")
            ? "bg-purple text-white"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <LinkIcon size={18} />
        </button>

        {/* Remove Link */}
        <button
          type="button"
          title="Remove Link"
          onClick={() =>
            editor
              .chain()
              .focus()
              .unsetLink()
              .run()
          }
          disabled={!editor.isActive("link")}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Unlink size={18} />
        </button>

        {/* Horizontal Rule */}
        <button
          type="button"
          title="Horizontal Rule"
          onClick={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <Minus size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;