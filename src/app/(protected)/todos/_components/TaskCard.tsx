"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import DeleteTask from "./DeleteTask";
import NoteMenu from "~/components/NoteMenu";
import StyledTaskViewer from "~/components/styled-task-viewer";

interface TaskCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export function TaskCard({ id, title, content, createdAt }: TaskCardProps) {
  const truncatedContent =
    content.length > 100 ? content.slice(0, 300) + "..." : content;

  return (
    <Card className="group flex h-[280px] w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-custom-dark-700 bg-custom-dark-900 shadow-lg transition-all duration-300 hover:border-custom-yellow-600 hover:shadow-custom-yellow-500/10 focus:border-custom-yellow-600 focus:shadow-custom-yellow-500/10">
      <CardHeader className="border-b border-custom-dark-700 bg-custom-dark-900/50 p-4">
        <CardTitle className="flex items-center justify-between text-lg font-semibold text-custom-yellow-500 transition-colors duration-300">
          <span> {title || "Untitled Task"}</span>
          <span>
            <NoteMenu note={{ id }} />
          </span>
        </CardTitle>
      </CardHeader>
      <Link
        href={`/todos/${id}`}
        className="min-h-0 flex-1 overflow-hidden p-4"
      >
        <CardContent>
          <div className="text-custom-neutral-300">
            <StyledTaskViewer content={truncatedContent} />
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
        <DeleteTask taskId={id} />
      </CardFooter>
    </Card>
  );
}
