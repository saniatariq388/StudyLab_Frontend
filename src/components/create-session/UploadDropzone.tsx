"use client";

import { useState } from "react";
import { UploadCloud, FolderOpen, FileText, CheckCircle2, X } from "lucide-react";

interface UploadDropzoneProps {
  onFilesAdded: (files: FileList) => void;
  onTextPasted: (text: string) => void;
}

export default function UploadDropzone({ onFilesAdded, onTextPasted }: UploadDropzoneProps) {
  const [showTextInput, setShowTextInput] = useState(false);
  const [pastedText, setPastedText] = useState("");

  const handleUseText = () => {
    if (!pastedText.trim()) return;
    onTextPasted(pastedText);
    setPastedText("");
    setShowTextInput(false);
  };

  if (showTextInput) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Paste your notes</h3>
          <button
            onClick={() => setShowTextInput(false)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          rows={10}
          placeholder="Paste your typed notes, textbook excerpt, or lecture content here..."
          className="w-full rounded-xl border border-gray-200 p-4 text-sm text-gray-900 outline-none focus:border-indigo-400"
        />
        <button
          onClick={handleUseText}
          disabled={!pastedText.trim()}
          className="mt-4 w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Use This Text
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
      <div className="mb-4 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
          <UploadCloud size={28} className="text-indigo-600" />
        </div>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        Drag &amp; drop scanned book pages, notes, or textbook chapters
      </h3>
      <p className="mx-auto mb-6 max-w-md text-sm text-gray-500">
        Supported formats: JPG, PNG. Or paste typed text directly — no scan needed.
      </p>

      <div className="mb-6 flex justify-center gap-3">
        <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
          <FolderOpen size={16} />
          Browse Files
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && onFilesAdded(e.target.files)}
          />
        </label>
        <button
          onClick={() => setShowTextInput(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-50 px-5 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
        >
          <FileText size={16} />
          Paste Text
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <CheckCircle2 size={14} className="text-green-500" />
          OCR Ready
        </span>
      </div>
    </div>
  );
}