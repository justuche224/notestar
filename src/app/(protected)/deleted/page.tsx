import { redirect } from "next/navigation";
import React from "react";
import { currentUser } from "~/server/auth/current-user";
import { db } from "~/server/db";
import Notes from "./_components/Notes";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) return redirect("/auth/login");
  const notes = await db.note.findMany({
    where: {
      userId: user.id,
      isDeleted: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      isDeleted: true,
    },
    orderBy: {
      isDeleted: "desc",
    },
  });
  return <Notes notes={notes} />;
};

export default page;