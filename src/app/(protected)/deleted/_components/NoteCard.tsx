import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import StyledNoteViewer from "~/components/styled-note-viewer";
import DeleteNote from "./DeleteNote";
import RestoreNote from "./RestoreNote";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  isDeleted: Date | null;
}

export function NoteCard({ id, title, content, isDeleted }: NoteCardProps) {
  const truncatedContent =
    content.length > 100 ? content.slice(0, 300) + "..." : content;

  return (
    <Card className="group flex h-[280px] w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-custom-dark-700 bg-custom-dark-900 shadow-lg transition-all duration-300 hover:border-custom-yellow-600 hover:shadow-custom-yellow-500/10 focus:border-custom-yellow-600 focus:shadow-custom-yellow-500/10">
      <CardHeader className="border-b border-custom-dark-700 bg-custom-dark-900/50 p-4">
        <CardTitle className="text-lg font-semibold text-custom-yellow-500 transition-colors duration-300 group-hover:text-custom-yellow-400">
          {title || "Untitled Note"}
        </CardTitle>
      </CardHeader>
      <Link
        href={`/notes/${id}`}
        className="min-h-0 flex-1 overflow-hidden p-4"
      >
        <CardContent>
          <div className="prose-sm text-custom-neutral-300">
            <StyledNoteViewer content={truncatedContent} />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between border-t border-custom-dark-700 bg-custom-dark-900/30 p-3">
        {isDeleted && (
          <span className="text-xs text-custom-neutral-500">
            Deleted{" "}
            {new Date(isDeleted).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
        <div className="flex items-center gap-2">
          <DeleteNote noteId={id} />
          <RestoreNote noteId={id} />
        </div>
      </CardFooter>
    </Card>
  );
}
