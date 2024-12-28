"use server";

import { NoteSchema } from "~/schemas";
import type z from "zod";
import logger from "~/utils/logger";
import { currentUser } from "~/server/auth/current-user";
import DOMPurify from "~/utils/server-dompurify";
import sanitizeConfig from "~/utils/sanitize-config";
import { db } from "~/server/db";

type NoteValues = z.infer<typeof NoteSchema>;

export type SaveNoteResponse = {
  success: boolean;
  error?: string;
  note?: {
    id: string;
    title: string;
    content: string;
    tags: string[];
  };
};

export const saveNote = async (
  values: NoteValues,
): Promise<SaveNoteResponse> => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const validatedFields = NoteSchema.safeParse(values);
    if (!validatedFields.success) {
      logger.error(validatedFields.error);
      return {
        success: false,
        error: validatedFields.error.message || "Invalid fields",
      };
    }
    logger.log(validatedFields.data);
    const { content, title, tags } = validatedFields.data;
    const safeContent = DOMPurify.sanitize(content, sanitizeConfig);

    const newNote = await db.note.create({
      data: {
        userId: user.id,
        title,
        tags: Array.isArray(tags) ? tags : [],
        content: safeContent,
      },
    });
    logger.info(newNote);
    return {
      success: true,
      note: {
        id: newNote.id,
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags,
      },
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      error: "Failed to save note",
    };
  }
};
