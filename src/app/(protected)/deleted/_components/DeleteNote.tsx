"use client";
import { Trash } from "lucide-react";
import { useTransition, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { deleteNote as deleteNoteServer } from "~/server/actions/notes/delete-note";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";

const DeleteNote = ({ noteId }: { noteId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const deleteNote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    startTransition(async () => {
      await deleteNoteServer(noteId).then((data) => {
        if (data.error) toast.error(data.error);
        if (data.success) {
          toast.success("Note Deleted!");
          setIsOpen(false);
        }
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-red-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
        >
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Permanently delete note?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            note.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={deleteNote}
            className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-red-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
          >
            {isPending ? <ClipLoader size={16} color="black" /> : <Trash />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteNote;
