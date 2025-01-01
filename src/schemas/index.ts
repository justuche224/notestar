import * as z from "zod";
//TODO two factor ui at the video 5:43:49
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().optional(),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Minimum of 6 characters required" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Minimum of 6 characters required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Email is required" }),
    username: z.string().min(4, { message: "Name is required" }),
    password: z
      .string()
      .min(6, { message: "Minimum of 6 characters required" }),
    confirmPassword: z.string(),
    firstname: z.string().min(1, { message: "Name is required" }),
    lastname: z.string().min(1, { message: "Name is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const NoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  tags: z
    .union([
      z.string().transform((val) =>
        val
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      ),
      z.array(z.string()),
    ])
    .default([]),
});

export const TodoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  tags: z
    .union([
      z.string().transform((val) =>
        val
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      ),
      z.array(z.string()),
    ])
    .default([]),
});
