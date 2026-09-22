"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  Trash2,
  ChevronDown,
  FolderPlus,
  Download,
  RotateCcw,
} from "lucide-react";
import {
  getUserFolders,
  createFolder,
  deleteFolder,
  getSessionsInFolder,
  deleteSession,
  UserFolder,
  FolderSession,
} from "@/src/services/folderApiService";
import { exportSessionFlashcards } from "@/src/lib/exportFlashcards";

export default function RealFoldersContent() {
  const [folders, setFolders] = useState<UserFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sessionsByFolder, setSessionsByFolder] = useState<
    Record<string, FolderSession[]>
  >({});
  const [newFolderName, setNewFolderName] = useState("");

  const loadFolders = () => {
    setLoading(true);
    getUserFolders()
      .then(setFolders)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const handleExpand = async (folderId: string) => {
    if (expandedId === folderId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(folderId);
    if (!sessionsByFolder[folderId]) {
      const sessions = await getSessionsInFolder(folderId);
      setSessionsByFolder((prev) => ({ ...prev, [folderId]: sessions }));
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    await createFolder(newFolderName.trim());
    setNewFolderName("");
    loadFolders();
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (
      !confirm(
        "Delete this folder? Sessions inside will remain but become unlinked.",
      )
    )
      return;
    await deleteFolder(folderId);
    loadFolders();
  };

  const handleDeleteSession = async (folderId: string, sessionId: string) => {
    if (!confirm("Delete this session and all its flashcards?")) return;
    await deleteSession(sessionId);
    setSessionsByFolder((prev) => ({
      ...prev,
      [folderId]: prev[folderId].filter((s) => s.id !== sessionId),
    }));
  };

  if (loading)
    return <p className="text-sm text-gray-500">Loading folders...</p>;

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name..."
          className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
        />
        <button
          onClick={handleCreateFolder}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <FolderPlus size={16} />
          Create
        </button>
      </div>

      {folders.length === 0 ? (
        <p className="text-sm text-gray-400">
          No folders yet. Create one above.
        </p>
      ) : (
        <div className="space-y-4">
          {folders.map((folder) => (
            <div key={folder.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleExpand(folder.id)}
                  className="flex flex-1 items-center gap-2 text-left"
                >
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      expandedId === folder.id ? "rotate-180" : ""
                    }`}
                  />
                  <h3 className="text-base font-semibold text-gray-900">
                    📁 {folder.name}
                  </h3>
                </button>
                <button
                  onClick={() => handleDeleteFolder(folder.id)}
                  className="text-gray-300 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {expandedId === folder.id && (
                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                  {!sessionsByFolder[folder.id] ? (
                    <p className="text-xs text-gray-400">Loading sessions...</p>
                  ) : sessionsByFolder[folder.id].length === 0 ? (
                    <p className="text-xs text-gray-400">
                      No sessions saved in this folder yet.
                    </p>
                  ) : (
                    sessionsByFolder[folder.id].map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {session.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {session.totalCards} cards
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/view-cards?sessionId=${session.id}`}
                            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
                          >
                            <BookOpen size={13} />
                            View Cards
                          </Link>
                          <Link
                            href={`/study?sessionId=${session.id}`}
                            className="flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-100"
                          >
                            <RotateCcw size={13} />
                            Study Again
                          </Link>
                          <button
                            onClick={() =>
                              exportSessionFlashcards(session.id, session.name)
                            }
                            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
                          >
                            <Download size={13} />
                            Export
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteSession(folder.id, session.id)
                            }
                            className="text-gray-300 hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
