"use client";

import { Sparkles, FileText } from "lucide-react";

export default function QuickUploadCard() {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-indigo-600">
          <Sparkles size={14} />
          AI Book-to-Card Engine
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          Vectorize lecture slides or research PDFs
        </h3>
        <p className="max-w-md text-sm text-gray-500">
          Upload syllabi, notes, or chapter handouts. FlashRecall automatically constructs atomic
          flashcards with confidence mnemonics.
        </p>
      </div>

      <label className="flex w-56 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center hover:border-indigo-300 hover:bg-indigo-50">
        <FileText size={22} className="text-gray-400" />
        <p className="text-sm font-medium text-gray-600">Drop study documents here</p>
        <p className="text-xs text-gray-400">PDF, EPUB, or Markdown (up to 40MB)</p>
        <input type="file" className="hidden" accept=".pdf,.epub,.md" />
      </label>
    </div>
  );
}