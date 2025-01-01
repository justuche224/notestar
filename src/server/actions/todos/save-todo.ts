"use server";

import { TodoSchema } from "~/schemas";
import type z from "zod";
import logger from "~/utils/logger";
import { currentUser } from "~/server/auth/current-user";
import DOMPurify from "~/utils/server-dompurify";
import sanitizeConfig from "~/utils/sanitize-config";
import { db } from "~/server/db";

type TodoValues = z.infer<typeof TodoSchema>;

export type SaveTodoResponse = {
  success: boolean;
  error?: string;
  todo?: {
    id: string;
    title: string;
    content: string;
    tags: string[];
  };
};

//TODO check character count

export const saveTodo = async (
  values: TodoValues,
): Promise<SaveTodoResponse> => {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const validatedFields = TodoSchema.safeParse(values);
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

    const newTodo = await db.todo.create({
      data: {
        userId: user.id,
        title,
        tags: Array.isArray(tags) ? tags : [],
        content: safeContent,
      },
    });
    logger.info(newTodo);
    return {
      success: true,
      todo: {
        id: newTodo.id,
        title: newTodo.title,
        content: newTodo.content,
        tags: newTodo.tags,
      },
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      error: "Failed to save todo",
    };
  }
};
