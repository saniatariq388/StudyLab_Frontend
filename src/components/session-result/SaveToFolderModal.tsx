"use client";

import { useEffect, useState } from "react";
import { X, FolderPlus, Loader2 } from "lucide-react";
import { getUserFolders, createFolder, attachSessionToFolder, UserFolder } from "@/src/services/folderApiService";

interface SaveToFolderModalProps {
  sessionId: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function SaveToFolderModal({ sessionId, onClose, onSaved }: SaveToFolderModalProps) {
  const [folders, setFolders] = useState<UserFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserFolders()
      .then((data) => {
        setFolders(data);
        // If the user has no folders at all, jump straight to "create new" mode
        if (data.length === 0) setShowNewFolderInput(true);
      })
      .catch(() => setError("Could not load folders."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      let folderId = selectedFolderId;

      if (showNewFolderInput) {
        if (!newFolderName.trim()) {
          setError("Please enter a folder name.");
          setSaving(false);
          return;
        }
        const created = await createFolder(newFolderName.trim());
        folderId = created.id;
      }

      if (!folderId) {
        setError("Please select or create a folder.");
        setSaving(false);
        return;
      }

      await attachSessionToFolder(sessionId, folderId);
      onSaved();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Save Session to Folder</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading your folders...</p>
        ) : (
          <>
            {folders.length > 0 && !showNewFolderInput && (
              <div className="mb-4 space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolderId(folder.id)}
                    className={`flex w-full items-center gap-2 rounded-xl border p-3 text-left text-sm ${
                      selectedFolderId === folder.id
                        ? "border-indigo-400 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    📁 {folder.name}
                  </button>
                ))}

                <button
                  onClick={() => setShowNewFolderInput(true)}
                  className="flex w-full items-center gap-2 rounded-xl border border-dashed border-gray-300 p-3 text-left text-sm text-indigo-600 hover:bg-indigo-50"
                >
                  <FolderPlus size={16} />
                  Create New Folder
                </button>
              </div>
            )}

            {showNewFolderInput && (
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  {folders.length === 0 ? "Name your first folder" : "New folder name"}
                </label>
                <input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g. Biology"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  autoFocus
                />
                {folders.length > 0 && (
                  <button
                    onClick={() => setShowNewFolderInput(false)}
                    className="mt-2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    ← Back to folder list
                  </button>
                )}
              </div>
            )}

            {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}