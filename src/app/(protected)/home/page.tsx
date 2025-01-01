import { redirect } from "next/navigation";
import React from "react";
import { currentUser } from "~/server/auth/current-user";
import { db } from "~/server/db";
import Home from "./_components/Home";

const page = async() => {
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
  return <Home recentNotes={notes} recentTasks={todos} />
};

export default page;
