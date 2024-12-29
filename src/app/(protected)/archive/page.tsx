import { redirect } from "next/navigation";
import React from "react";
import { currentUser } from "~/server/auth/current-user";
import { db } from "~/server/db";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) return redirect("/auth/login");
  const notes = await db.note.findMany({
    where: {
      userId: user.id,
      isDeleted: null,
      isArchived: {
        not: null,
      },
    },
    orderBy: {
      isArchived: "desc",
    },
  });
  return <div>page</div>;
};

export default page;
