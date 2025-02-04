import { redirect } from "next/navigation";
import React from "react";
import { currentUser } from "~/server/auth/current-user";
import Notes from "./_components/Notes";
import { db } from "~/server/db";
import logger from "~/utils/logger";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) return redirect("/auth/login");
  const notes = await db.note.findMany({
    where: { userId: user.id, isDeleted: null, isArchived: null },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  logger.log(notes);

  return (
    <div>
      <Notes serverNotes={notes} />
    </div>
  );
};

export default page;
