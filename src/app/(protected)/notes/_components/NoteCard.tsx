"use client";

import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import StyledNoteViewer from "~/components/styled-note-viewer";
import DeleteNote from "./DeleteNote";
import { Archive, Ellipsis, Pencil, Tag, Trash, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { archiveNote as serverArchiveNote } from "~/server/actions/notes/archive-note";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export function NoteCard({ id, title, content, createdAt }: NoteCardProps) {
  const truncatedContent =
    content.length > 100 ? content.slice(0, 300) + "..." : content;

  const [isPending, startTransition] = useTransition();

  const archiveNote = async (e: React.MouseEvent) => {
    if (isPending) return;
    e.stopPropagation();
    e.preventDefault();
    startTransition(async () => {
      await serverArchiveNote(id).then((data) => {
        if (data.error) toast.error(data.error);
        if (data.success) {
          toast.success("Note Archived!");
        }
      });
    });
  };

  return (
    <Card className="group flex h-[280px] w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-custom-dark-700 bg-custom-dark-900 shadow-lg transition-all duration-300 hover:border-custom-yellow-600 hover:shadow-custom-yellow-500/10 focus:border-custom-yellow-600 focus:shadow-custom-yellow-500/10">
      <CardHeader className="border-b border-custom-dark-700 bg-custom-dark-900/50 p-4">
        <CardTitle className="flex items-center justify-between text-lg font-semibold text-custom-yellow-500 transition-colors duration-300">
          <span> {title || "Untitled Note"}</span>
          <span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Edit note
                    <DropdownMenuShortcut>
                      <Pencil size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    View tags
                    <DropdownMenuShortcut>
                      <Tag size={15} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={archiveNote}>
                    Archive note
                    <DropdownMenuShortcut className="flex items-center gap-1">
                      {isPending && <ClipLoader size={16} color="black" />}
                      <Archive size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Move to Trash
                    <DropdownMenuShortcut>
                      <Trash2 size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 transition-all hover:text-red-400">
                    Delete Permanently
                    <DropdownMenuShortcut>
                      <Trash size={16} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
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
        <span className="text-xs text-custom-neutral-500">
          {new Date(createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>
        <DeleteNote noteId={id} />
      </CardFooter>
    </Card>
  );
}
