"use client";

import React from "react";
import { NoteCard } from "./NoteCard";
import { motion } from "framer-motion";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface NotesProps {
  notes: Note[];
}

const Notes = ({ notes }: NotesProps) => {
  return (
    <div className="min-h-screen bg-custom-dark-900 p-4">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <NoteCard
              id={note.id}
              title={note.title}
              content={note.content}
              createdAt={note.createdAt}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
