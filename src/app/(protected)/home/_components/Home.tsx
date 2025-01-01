"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { NoteCard } from "~/app/(protected)/notes/_components/NoteCard";
import { TaskCard } from "~/app/(protected)/todos/_components/TaskCard";
import { motion } from "framer-motion";
import { Plus, Book, CheckSquare } from "lucide-react";
import { useCurrentUser } from "~/hooks/use-current-user";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface HomeProps {
  recentNotes: Note[];
  recentTasks: Note[];
}

const Home = ({ recentNotes, recentTasks }: HomeProps) => {
  const user = useCurrentUser();
  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold text-custom-yellow-500">
          Welcome Back {user?.name}
        </h1>
        <p className="text-lg text-custom-neutral-300">
          Organize your thoughts and tasks in one place
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Link href="/notes/new">
          <Button className="h-24 w-full rounded-lg border border-custom-dark-700 bg-custom-dark-900 text-custom-yellow-500 transition-all duration-300 hover:border-custom-yellow-600 hover:bg-custom-dark-700 hover:shadow-lg hover:shadow-custom-yellow-500/20">
            <div className="flex flex-col items-center gap-2">
              <Plus size={24} />
              <span>New Note</span>
            </div>
          </Button>
        </Link>
        <Link href="/tasks/new">
          <Button className="h-24 w-full rounded-lg border border-custom-dark-700 bg-custom-dark-900 text-custom-yellow-500 transition-all duration-300 hover:border-custom-yellow-600 hover:bg-custom-dark-700 hover:shadow-lg hover:shadow-custom-yellow-500/20">
            <div className="flex flex-col items-center gap-2">
              <Plus size={24} />
              <span>New Task</span>
            </div>
          </Button>
        </Link>
        <Link href="/notes">
          <Button className="h-24 w-full rounded-lg border border-custom-dark-700 bg-custom-dark-900 text-custom-yellow-500 transition-all duration-300 hover:border-custom-yellow-600 hover:bg-custom-dark-700 hover:shadow-lg hover:shadow-custom-yellow-500/20">
            <div className="flex flex-col items-center gap-2">
              <Book size={24} />
              <span>All Notes</span>
            </div>
          </Button>
        </Link>
        <Link href="/tasks">
          <Button className="h-24 w-full rounded-lg border border-custom-dark-700 bg-custom-dark-900 text-custom-yellow-500 transition-all duration-300 hover:border-custom-yellow-600 hover:bg-custom-dark-700 hover:shadow-lg hover:shadow-custom-yellow-500/20">
            <div className="flex flex-col items-center gap-2">
              <CheckSquare size={24} />
              <span>All Tasks</span>
            </div>
          </Button>
        </Link>
      </motion.div>

      {/* Recent Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Notes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-custom-dark-700 bg-custom-dark-900">
            <CardHeader className="border-b border-custom-dark-700">
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl text-custom-yellow-500">
                  Recent Notes
                </span>
                <Link href="/notes">
                  <Button
                    variant="ghost"
                    className="text-custom-neutral-300 hover:text-custom-yellow-500"
                  >
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-4">
                {recentNotes.slice(0, 2).map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NoteCard {...note} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-custom-dark-700 bg-custom-dark-900">
            <CardHeader className="border-b border-custom-dark-700">
              <CardTitle className="flex items-center justify-between">
                <span className="text-xl text-custom-yellow-500">
                  Recent Tasks
                </span>
                <Link href="/tasks">
                  <Button
                    variant="ghost"
                    className="text-custom-neutral-300 hover:text-custom-yellow-500"
                  >
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-4">
                {recentTasks.slice(0, 2).map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TaskCard {...task} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
