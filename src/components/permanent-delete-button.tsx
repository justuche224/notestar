"use client";
import { Trash } from "lucide-react";
import { useTransition, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { deleteNote as deleteNoteServer } from "~/server/actions/notes/delete-note";
import { Card, CardFooter, CardHeader } from "./ui/card";

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
  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <>
      <Button
        onClick={toggleIsOpen}
        disabled={isPending}
        className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-red-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
      >
        {iconOnly ? <Trash /> : "Delete Permanently"}
      </Button>
      {isOpen && (
        <section
          onClick={toggleIsOpen}
          className={
            "absolute left-0 top-0 z-[1002] flex min-h-screen w-full flex-col items-center justify-center bg-[#00000063] backdrop-blur-sm"
          }
        >
          <Card
            onClick={handleCardClick}
            className="w-[370px] shadow-md sm:w-[420px] md:w-[500px]"
          >
            <CardHeader className="flex flex-col items-center justify-center">
              <h3 className="text-3xl font-extrabold text-red-500">
                Permanently delete note?
              </h3>
              <p className="text-center">
                This action cannot be undone. This will permanently delete this
                note.
              </p>
            </CardHeader>
            <CardFooter className="flex justify-center space-x-4">
              <Button
                variant={"ghost"}
                disabled={isPending}
                onClick={deleteNote}
                className="flex-1 rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-red-400 hover:shadow-lg hover:shadow-custom-yellow-500/20 focus:outline-none"
              >
                {isPending ? <ClipLoader size={16} color="black" /> : "Delete"}
              </Button>
              <Button
                variant={"ghost"}
                disabled={isPending}
                onClick={toggleIsOpen}
                className="flex-1 rounded-md bg-gray-500 px-3 py-1.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-400 hover:shadow-lg hover:shadow-custom-yellow-500/20 focus:outline-none"
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </section>
      )}
    </>
  );
};

export default PermanentlyDeleteButton;
