import React from "react";
import Viewer from "../_components/View";
import { db } from "~/server/db";

type notesParams = Promise<{ noteId: string }>;

const page = async ({ params }: { params: notesParams }) => {
  const { noteId } = await params;
  const note = await db.note.findUnique({ where: { id: noteId } });
  if (!note) return <div>404</div>;
  return <Viewer content={note.content} />;
};

export default page;
