"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "~/server/auth/current-user";
import { db } from "~/server/db";
import logger from "~/utils/logger";

export const restoreNote = async (noteId: string) => {
  try {
    const user = await currentUser();
    if (!user?.id) return { error: "User not authenticated!" };

    const note = await db.note.findUnique({
      where: {
        id: noteId,
        userId: user.id,
        isDeleted: { not: null },
      },
    });

    if (!note) return { error: "Note not found or unauthorized!" };

    await db.note.update({
      where: { id: noteId },
      data: { isDeleted: null },
    });
    revalidatePath("/notes");
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { error: "Something went wrong!" };
  }
};
