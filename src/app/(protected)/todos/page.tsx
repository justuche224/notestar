import { redirect } from "next/navigation";
import React from "react";
import { currentUser } from "~/server/auth/current-user";
import Tasks from "./_components/Tasks";
import { db } from "~/server/db";

const page = async () => {
  const user = await currentUser();
  if (!user?.id) return redirect("/auth/login");
  const todos = await db.todo.findMany({
    where: { userId: user.id, isDeleted: null, isArchived: null },
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
      <Tasks serverTasks={todos} />
    </div>
  );
};

export default page;
