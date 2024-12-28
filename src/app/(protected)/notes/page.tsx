import { redirect } from "next/navigation";
import React from "react";
import { currentUser } from "~/server/auth/current-user";
import Notes from "./_components/Notes";
import { db } from "~/server/db";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) return redirect("/auth/login");
  const notes = await db.note.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <Notes notes={notes} />
    </div>
  );
};

export default page;
