"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { NoteCard } from "./NoteCard";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { debounce } from "lodash";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface NotesProps {
  serverNotes: Note[];
}

const Notes = ({ serverNotes }: NotesProps) => {
  const [originalNotes] = useState(serverNotes);
  const [filteredNotes, setFilteredNotes] = useState(serverNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const searchNotes = useMemo(
    () => (searchValue: string) => {
      const lowerSearchTerm = searchValue.toLowerCase().trim();

      if (!lowerSearchTerm) {
        return originalNotes;
      }

      return originalNotes.filter((note) => {
        if (note.title.toLowerCase().includes(lowerSearchTerm)) {
          return true;
        }
        const truncatedContent = note.content.slice(0, 200).toLowerCase();
        return truncatedContent.includes(lowerSearchTerm);
      });
    },
    [originalNotes],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      const results = searchNotes(searchValue);
      setFilteredNotes(results);
    }, 300),
    [searchNotes],
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const renderEmptyState = () => {
    // If there's a search term but no results
    if (searchTerm) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <p className="text-lg text-gray-600">
            No notes found for &quot;{searchTerm}&quot;
          </p>
          <Button
            className="rounded-md bg-custom-yellow-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-custom-yellow-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
            onClick={() => router.push(`/search?term=${searchTerm}`)}
          >
            Try Full Search
          </Button>
        </div>
      );
    }

    // If there are no notes at all
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <p className="text-lg text-gray-600">
          No notes yet. Create your first note to get started!
        </p>
        <Link href="/notes/new">
          <Button className="rounded-md bg-custom-yellow-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-custom-yellow-400 hover:shadow-lg hover:shadow-custom-yellow-500/20">
            Create Note
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="max-w-md border border-custom-yellow-500"
          />
          <Button
            className="rounded-md bg-custom-yellow-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-custom-yellow-400 hover:shadow-lg hover:shadow-custom-yellow-500/20"
            onClick={() => router.push(`/search?term=${searchTerm}`)}
          >
            Full Search
          </Button>
        </div>
        <div>
          <Link href="/notes/new">
            <Button className="rounded-md bg-custom-yellow-500 px-3 py-1.5 text-sm font-medium text-custom-dark-900 transition-all duration-300 hover:bg-custom-yellow-400 hover:shadow-lg hover:shadow-custom-yellow-500/20">
              New Note
            </Button>
          </Link>
        </div>
      </div>
      <hr className="my-4" />
      {filteredNotes.length > 0 ? (
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredNotes.map((note, index) => (
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
      ) : (
        renderEmptyState()
      )}
    </div>
  );
};

export default Notes;
