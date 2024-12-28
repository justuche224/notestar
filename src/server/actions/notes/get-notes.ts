import { db } from "~/server/db";
import logger from "~/utils/logger";

export const getNotes = async (userId: string) => {
  try {
    if (!userId) return { error: "User not authenticated!" };
    const notes = await db.note.findMany({ where: { userId } });
    return { success: true, data: notes };
  } catch (error) {
    logger.error(error);
    return { error: "Something went wrong!" };
  }
};
