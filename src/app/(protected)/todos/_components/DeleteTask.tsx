"use client";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { trashNote } from "~/server/actions/notes/trash-note";

const DeleteNote = ({ taskId }: { taskId: string }) => {
  const [isPending, startTransition] = useTransition();

  const deleteNote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    startTransition(async () => {
      await trashNote(taskId).then((data) => {
        if (data.error) toast.error(data.error);
        if (data.success) toast.success("Note Moved to Trash!");
      });
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={deleteNote}
      className="rounded-md bg-custom-yellow-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-custom-yellow-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
    >
      {isPending ? <ClipLoader size={16} color="black" /> : <Trash />}
    </Button>
  );
};
export default DeleteNote;
