import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import StyledNoteViewer from "./styled-note-viewer";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export function NoteCard({ id, title, content, createdAt }: NoteCardProps) {
  const truncatedContent =
    content.length > 100 ? content.slice(0, 100) + "..." : content;

  return (
    <Card className="group flex h-[280px] w-full flex-col overflow-hidden rounded-lg border border-custom-dark-700 bg-custom-dark-800 shadow-lg transition-all duration-300 hover:border-custom-yellow-600 hover:shadow-custom-yellow-500/10">
      <CardHeader className="border-b border-custom-dark-700 bg-custom-dark-900/50 p-4">
        <CardTitle className="text-lg font-semibold text-custom-yellow-500 transition-colors duration-300 group-hover:text-custom-yellow-400">
          {title || "Untitled Note"}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-hidden p-4">
        <div className="prose-sm text-custom-neutral-300">
          <StyledNoteViewer content={truncatedContent} />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-custom-dark-700 bg-custom-dark-900/30 p-3">
        <span className="text-xs text-custom-neutral-500">
          {new Date(createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>
        <Button
          asChild
          className="rounded-md bg-custom-yellow-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-custom-yellow-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
        >
          <Link href={`/notes/${id}`}>View Note</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
