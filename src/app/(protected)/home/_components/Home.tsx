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
    <div className="min-h-screen p-4">
      {/* Compact Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-custom-yellow-500">
          Welcome, {user?.name}
        </h1>
        <p className="text-sm text-custom-neutral-300">
          Your personal workspace
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { href: "/notes/new", icon: Plus, label: "New Note" },
          { href: "/todos/new", icon: Plus, label: "New Todo" },
          { href: "/notes", icon: Book, label: "Notes" },
          { href: "/todos", icon: CheckSquare, label: "Todos" },
        ].map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}>
            <Button className="h-16 w-full border border-custom-dark-700 bg-custom-dark-900 text-custom-yellow-500 transition-all hover:border-custom-yellow-600 hover:bg-custom-dark-800">
              <div className="flex items-center gap-2">
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </div>
            </Button>
          </Link>
        ))}
      </motion.div>

      {/* Recent Content */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Notes */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-custom-dark-700 bg-custom-dark-900">
            <CardHeader className="border-b border-custom-dark-700 py-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg text-custom-yellow-500">
                  Recent Notes
                </span>
                <Link href="/notes">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-custom-neutral-300 hover:text-custom-yellow-500"
                  >
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {recentNotes.slice(0, 2).map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
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
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-custom-dark-700 bg-custom-dark-900">
            <CardHeader className="border-b border-custom-dark-700 py-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg text-custom-yellow-500">
                  Recent Tasks
                </span>
                <Link href="/tasks">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-custom-neutral-300 hover:text-custom-yellow-500"
                  >
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-3">
                {recentTasks.slice(0, 2).map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
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
