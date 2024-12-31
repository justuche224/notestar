"use client";
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
import { Archive, Ellipsis, Pencil, Tag, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { archiveNote as serverArchiveNote } from "~/server/actions/notes/archive-note";
import { toast } from "sonner";
import { useTransition } from "react";
import { trashNote } from "~/server/actions/notes/trash-note";

import { ClipLoader } from "react-spinners";
import PermanentlyDeleteButton from "./permanent-delete-button";

interface NoteMenuProp {
  id: string;
  isDeleted?: Date;
  isArchived?: Date;
}

const NoteMenu = ({ note }: { note: NoteMenuProp }) => {
  const { id, isDeleted, isArchived } = note;
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

  const deleteNote = async (e: React.MouseEvent) => {
    if (isPending) return;
    e.stopPropagation();
    e.preventDefault();
    startTransition(async () => {
      await trashNote(id).then((data) => {
        if (data.error) toast.error(data.error);
        if (data.success) toast.success("Note Moved to Trash!");
      });
    });
  };

  return (
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
          {!isArchived && !isDeleted && (
            <DropdownMenuItem onClick={archiveNote}>
              Archive note
              <DropdownMenuShortcut className="flex items-center gap-1">
                {isPending && <ClipLoader size={16} color="black" />}
                <Archive size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!isDeleted && (
            <DropdownMenuItem onClick={deleteNote}>
              Move to Trash
              <DropdownMenuShortcut className="flex items-center gap-1">
                {isPending && <ClipLoader size={16} color="black" />}
                <Trash2 size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <div>
            <PermanentlyDeleteButton noteId={id} />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteMenu;
