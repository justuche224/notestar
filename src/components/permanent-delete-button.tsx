"use client";
import { Trash } from "lucide-react";
import { useTransition, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { deleteNote as deleteNoteServer } from "~/server/actions/notes/delete-note";
import { Card, CardFooter, CardHeader } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const PermanentlyDeleteButton = ({
  noteId,
  iconOnly,
}: {
  noteId: string;
  iconOnly?: boolean;
}) => {
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
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        if (isPending) return;
        setIsOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          disabled={isPending}
          className="mt-1 w-full justify-start rounded-md bg-red-500 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-red-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
        >
          {iconOnly ? <Trash /> : "Delete Permanently"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-red-500">
            Permanently delete note?
          </DialogTitle>
          <DialogDescription className="text-center">
            This action cannot be undone. This will permanently delete this
            note.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            disabled={isPending}
            onClick={deleteNote}
            className="flex-1 rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-red-400 hover:shadow-lg hover:shadow-custom-yellow-500/20 focus:outline-none"
          >
            {isPending ? <ClipLoader size={16} color="black" /> : "Delete"}
          </Button>
          <Button
            disabled={isPending}
            variant="ghost"
            className="flex-1 rounded-md bg-gray-500 px-3 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-400 hover:shadow-lg hover:shadow-custom-yellow-500/20 focus:outline-none"
            asChild
          >
            <DialogClose>Cancel</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermanentlyDeleteButton;
