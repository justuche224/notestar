"use client";
import "./styles.css";
// https://i.postimg.cc/hP682H9k/20241215-081045.jpg
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Dropcursor from "@tiptap/extension-dropcursor";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import type { Editor as EditorType } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  MessageSquareQuote,
  Ruler,
  Undo,
  Redo,
  ListOrdered,
  List,
  Braces,
  TableRowsSplit,
  Pilcrow,
  Save,
  AlignCenter,
  AlignLeft,
  AlignRight,
  ImagePlus,
  Highlighter,
  UnderlineIcon,
} from "lucide-react";
import { Progress } from "~/components/ui/progress";
import { NoteSaveModal } from "~/components/modals/NoteSaveModal";
const MenuBar = ({ content }: { content: string }) => {
  const { editor } = useCurrentEditor();
  const [openSave, setOpenSave] = useState(false);

  if (!editor) {
    return null;
  }

  const limit = 5000;

  const handleSave = async () => {
    setOpenSave(true);
  };

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  return (
    <>
      {openSave && (
        <NoteSaveModal setOpenSave={setOpenSave} content={content} />
      )}
      <div className="control-group">
        <div className="button-group">
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
              >
                <Bold size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Bold</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
              >
                <Italic size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Italic</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
              >
                <Strikethrough size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Strikethrough</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "is-active" : ""}
              >
                <UnderlineIcon size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>UnderlineIcon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={editor.isActive("code") ? "is-active" : ""}
              >
                <Code size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? "is-active" : ""}
              >
                <Pilcrow size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Paragraph</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                <Heading1 size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Heading 1</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
              >
                <Heading2 size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Heading 2</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
              >
                <Heading3 size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Heading 3</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                }
              >
                <Heading4 size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Heading 4</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={
                  editor.isActive("heading", { level: 5 }) ? "is-active" : ""
                }
              >
                <Heading5 size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Heading 5</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={
                  editor.isActive("heading", { level: 6 }) ? "is-active" : ""
                }
              >
                <Heading6 size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Heading 6</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                <List size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Bullet List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
              >
                <ListOrdered size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Ordered List</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "is-active" : ""}
              >
                <Braces size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Code Block</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "is-active" : ""}
              >
                <MessageSquareQuote size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Block Quote</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <Ruler size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Horizontal Rule</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().setHardBreak().run()}
              >
                <TableRowsSplit size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Hard Break</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
              >
                <AlignLeft size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Align Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
              >
                <AlignCenter size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Align Center</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
              >
                <AlignRight size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Align Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive("highlight") ? "is-active" : ""}
              >
                <Highlighter size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Highlight</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger onClick={addImage}>
                <ImagePlus size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Add Image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
              >
                <Undo size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Undo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
              >
                <Redo size={15} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={250}>
            <Tooltip>
              <TooltipTrigger onClick={handleSave}>
                <Save size={20} />
              </TooltipTrigger>
              <TooltipContent className="z-[1001]">
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="my-2 flex w-full flex-col items-center gap-2 text-center">
        <Progress value={percentage} className="w-[200px]" color="#ffc300" />
        <div
          className={`text-sm ${editor.storage.characterCount.characters() === limit ? "text-destructive" : "text-custom-yellow-500"}`}
        >
          {editor.storage.characterCount.characters()} / {limit} characters
          <br />
          {editor.storage.characterCount.words()} words
        </div>
      </div>
    </>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // @ts-expect-error i'll fix later
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
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
  Highlight,
  Image,
  Dropcursor,
  CharacterCount.configure({ limit: 5000 }),
  Underline,
];

interface editorProps {
  serverContent?: string;
}

const Editor = ({ serverContent }: editorProps) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (serverContent) {
      setContent(serverContent);
    }
    setLoading(false);
  }, [serverContent]);
  const handleUpdate = ({ editor }: { editor: EditorType }) => {
    const newContent = editor.getHTML();
    setContent(newContent);
  };
  if (loading) {
    return (
      <div>
        <p>loading......</p>
      </div>
    );
  }
  return (
    <>
      <EditorProvider
        slotBefore={<MenuBar content={content} />}
        extensions={extensions}
        content={content}
        onUpdate={handleUpdate}
        autofocus={true}
      ></EditorProvider>
    </>
  );
};

export default Editor;
