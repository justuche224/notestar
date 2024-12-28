"use client";
import "./styles.css";

import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import sanitizeConfig from "~/utils/sanitize-config";

const extensions = [
  Color,
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit,
  Highlight,
];

const Viewer = ({ content }: { content: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(content, sanitizeConfig);
  return (
    <EditorProvider
      extensions={extensions}
      content={sanitizedHtml}
      editable={false}
    />
  );
};

export default Viewer;
