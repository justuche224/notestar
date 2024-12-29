"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "~/server/auth/current-user";
import { db } from "~/server/db";
import logger from "~/utils/logger";

export const deleteNote = async (noteId: string) => {
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

    if (!note)
      return { error: "Note not found, unauthorized, or not in trash!" };

    await db.note.delete({
      where: { id: noteId },
    });
    revalidatePath("/deleted");
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { error: "Something went wrong!" };
  }
};
