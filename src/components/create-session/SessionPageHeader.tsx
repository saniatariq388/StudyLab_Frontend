import { Sparkles } from "lucide-react";

export default function SessionPageHeader() {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <p className="mb-2 text-xs font-medium text-gray-400">
          LIBRARY &gt; BIOLOGY &gt; <span className="text-indigo-600">NEW SESSION</span>
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">Create Study Session</h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Upload book pages or lecture notes. AI extracts key learning points and turns them into
          recall flashcards.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-medium text-indigo-700">
        <Sparkles size={16} />
        Model: FlashExtract v2.4 (Biomed Trained)
      </div>
    </div>
  );
}