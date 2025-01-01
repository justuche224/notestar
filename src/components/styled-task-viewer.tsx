"use client";
import React from "react";
import DOMPurify from "dompurify";
import sanitizeConfig from "~/utils/sanitize-config";

const StyledTaskViewer = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content, sanitizeConfig);

  return (
    <div className="ProseMirror max-w-none">
      <style jsx global>{`
        .ProseMirror ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          margin: 0.5rem 0;
          background: #2a2a2a;
          border: 1px solid #333;
          border-radius: 0.375rem;
          transition: all 0.2s ease;
        }

        .ProseMirror ul[data-type="taskList"] li:hover {
          border-color: #ffc300;
        }

        .ProseMirror ul[data-type="taskList"] li[data-checked="true"] {
          background: #1a1a1a;
          text-decoration: line-through;
          color: #666;
        }

        .ProseMirror ul[data-type="taskList"] li[data-checked="true"]:hover {
          border-color: #ffc300;
        }

        .ProseMirror ul[data-type="taskList"] input[type="checkbox"] {
          appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid #ffc300;
          border-radius: 0.25rem;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .ProseMirror ul[data-type="taskList"] input[type="checkbox"]:checked {
          background-color: #ffc300;
        }

        .ProseMirror
          ul[data-type="taskList"]
          input[type="checkbox"]:checked::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #000;
          font-size: 0.8rem;
          font-weight: bold;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
};

export default StyledTaskViewer;
