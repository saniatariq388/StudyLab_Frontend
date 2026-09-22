"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderInput, RotateCcw, Download, CheckCircle2 } from "lucide-react";
import SaveToFolderModal from "./SaveToFolderModal";

interface ResultActionsProps {
  sessionId: string;
}

export default function ResultActions({ sessionId }: ResultActionsProps) {
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {saved ? (
          <span className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
            <CheckCircle2 size={16} />
            Saved to Folder
          </span>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <FolderInput size={16} />
            Save Session to Folder
          </button>
        )}

        <Link
          href={`/study?sessionId=${sessionId}`}
          className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          <RotateCcw size={16} />
          Study Again
        </Link>
        <button className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200">
          <Download size={16} />
          Export Flashcards
        </button>
      </div>

      <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900">
        Return to Dashboard →
      </Link>

      {showModal && (
        <SaveToFolderModal
          sessionId={sessionId}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            setSaved(true);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}