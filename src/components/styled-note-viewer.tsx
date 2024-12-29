"use client";
import React from "react";
import DOMPurify from "dompurify";
import sanitizeConfig from "~/utils/sanitize-config";

const StyledNoteViewer = ({ content }: { content: string }) => {
  const sanitizedContent = DOMPurify.sanitize(content, sanitizeConfig);

  return (
    <div className="prose prose-invert max-w-none">
      <style jsx global>{`
        .prose {
          color: #e0e0e0;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }

        .prose > *:first-child {
          margin-top: 0;
        }

        .prose ul,
        .prose ol {
          padding: 0 1rem;
          margin: 1.25rem 1rem 1.25rem 0.4rem;
        }

        .prose ul li p,
        .prose ol li p {
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          line-height: 1.1;
          margin-top: 2.5rem;
          text-wrap: pretty;
          color: #ffc300;
        }

        .prose h1,
        .prose h2 {
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
        }

        .prose h1 {
          font-size: 1.4rem;
        }

        .prose h2 {
          font-size: 1.2rem;
        }

        .prose h3 {
          font-size: 1.1rem;
        }

        .prose code {
          background-color: #000000;
          border-radius: 0.4rem;
          color: #ffc300;
          font-size: 0.85rem;
          padding: 0.25em 0.3em;
          font-family: monospace;
        }

        .prose pre {
          background: #000000;
          border-radius: 0.5rem;
          color: #e0e0e0;
          font-family: "JetBrainsMono", monospace;
          margin: 1.5rem 0;
          padding: 0.75rem 1rem;
          border: 1px solid #333;
        }

        .prose mark {
          background-color: #faf594;
          border-radius: 0.4rem;
          box-decoration-break: clone;
          padding: 0.1rem 0.3rem;
        }

        .prose pre code {
          background: none;
          color: inherit;
          font-size: 0.8rem;
          padding: 0;
        }

        .prose blockquote {
          border-left: 3px solid #ffc300;
          margin: 1.5rem 0;
          padding-left: 1rem;
          color: #b0b0b0;
        }

        .prose hr {
          border: none;
          border-top: 2px solid #333;
          margin: 2rem 0;
        }

        .prose p {
          margin: 0.75rem 0;
          line-height: 1.6;
        }

        .prose strong {
          color: #ffc300;
        }

        .prose em {
          color: #e0e0e0;
          font-style: italic;
        }

        .prose a {
          color: #ffc300;
          text-decoration: underline;
          text-decoration-thickness: 0.1em;
        }

        .prose ul {
          list-style-type: disc;
        }

        .prose ul ul {
          list-style-type: circle;
        }

        .prose ul ul ul {
          list-style-type: square;
        }

        .prose ol {
          list-style-type: decimal;
        }

        .prose ol ol {
          list-style-type: lower-alpha;
        }

        .prose ol ol ol {
          list-style-type: lower-roman;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
};

export default StyledNoteViewer;
