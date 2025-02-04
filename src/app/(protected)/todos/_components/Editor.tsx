"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import type { Editor as EditorType } from "@tiptap/react";
import "./styles.css";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useState, useTransition } from "react";
import type z from "zod";
import { TodoSchema } from "~/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import FormSuccess from "~/app/auth/_components/form-success";
import FormError from "~/app/auth/_components/form-error";
import { Button } from "~/components/ui/button";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import sanitizeConfig from "~/utils/sanitize-config";
import { saveTodo } from "~/server/actions/todos/save-todo";
import logger from "~/utils/logger";

const CustomDocument = Document.extend({
  content: "taskList",
});

const CustomTaskItem = TaskItem.extend({
  content: "inline*",
});

const Editor = () => {
  const [openSave, setOpenSave] = useState(false);
  const [content, setContent] = useState(`
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false"></li>
      </ul>
    `);
  const handleUpdate = ({ editor }: { editor: EditorType }) => {
    const newContent = editor.getHTML();
    setContent(newContent);
  };
  const editor = useEditor({
    extensions: [CustomDocument, Paragraph, Text, TaskList, CustomTaskItem],
    content,
    onUpdate: handleUpdate,
  });

  return (
    <div className="editor-wrapper">
      {openSave && <SaveForm content={content} setOpenSave={setOpenSave} />}
      <div className="flex w-full justify-end">
        <Button
          onClick={() => setOpenSave(true)}
          className="rounded-md bg-custom-yellow-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-custom-yellow-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
        >
          Save Todos
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;

type TodoValues = z.infer<typeof TodoSchema>;

const SaveForm = ({
  content,
  setOpenSave,
}: {
  content: string;
  setOpenSave: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const [shouldExit, setShouldExit] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<TodoValues>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      content,
      title: "",
      tags: [],
    },
  });
  const router = useRouter();
  const onSubmit = (values: TodoValues, exit: boolean) => {
    setError("");
    setSuccess("");
    setShouldExit(exit);
    const content = DOMPurify.sanitize(values.content, sanitizeConfig);
    logger.log(content);
    logger.log("after purification");
    values.content = content;

    startTransition(async () => {
      await saveTodo(values).then((data) => {
        if (data.success) {
          setError("");
          if (exit) {
            return router.push("/todos");
          }
          setOpenSave(false);
        }
        setError(data.error ?? "");
      });
    });
  };

  return (
    <section
      onClick={() => setOpenSave(false)}
      className="fixed left-0 top-0 z-[1002] flex min-h-screen w-full flex-col items-center justify-center bg-[#0000005f] backdrop-blur-sm"
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className="w-[370px] shadow-md sm:w-[420px] md:w-[500px]"
      >
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-3xl font-extrabold text-yellow-500">
              Save Note
            </h3>
            <Link href="/">
              <Image
                src="/images/logo-long.png"
                alt="Logo"
                width={130}
                height={50}
                className="h-auto drop-shadow-lg"
              />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2 block text-sm text-gray-300">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Todo title"
                          type="text"
                          disabled={isPending}
                          className="w-full rounded-lg border border-yellow-600/20 bg-zinc-800 px-4 py-4 text-sm text-gray-200 outline-yellow-500 placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2 block text-sm text-gray-300">
                        Tags
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter tags separated by commas (e.g., work, important, todo)"
                          type="text"
                          disabled={isPending}
                          className="w-full rounded-lg border border-yellow-600/20 bg-zinc-800 px-4 py-4 text-sm text-gray-200 outline-yellow-500 placeholder:text-gray-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="!mt-8 space-y-4">
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() =>
                      form.handleSubmit((values) => onSubmit(values, false))()
                    }
                    disabled={isPending}
                    className="flex-1 rounded-lg bg-yellow-500 px-4 py-3 text-sm tracking-wide text-black shadow-xl hover:bg-yellow-400 focus:outline-none"
                  >
                    <span className="mr-2">Save & Continue</span>
                    {isPending && !shouldExit && (
                      <ClipLoader color="blue" size={20} />
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      form.handleSubmit((values) => onSubmit(values, true))()
                    }
                    disabled={isPending}
                    className="flex-1 rounded-lg bg-gray-500 px-4 py-3 text-sm tracking-wide text-white shadow-xl hover:bg-gray-400 focus:outline-none"
                  >
                    <span className="mr-2">Save & Exit</span>
                    {isPending && shouldExit && (
                      <ClipLoader color="blue" size={20} />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="mt-4 flex items-center justify-center text-center font-semibold text-yellow-500 hover:text-yellow-400 hover:underline">
          <Button onClick={() => setOpenSave(false)}>Close</Button>
        </CardFooter>
      </Card>
    </section>
  );
};
