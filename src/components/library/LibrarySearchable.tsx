"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Play } from "lucide-react";
import { LibrarySessionItem } from "@/src/services/libraryService";

export default function LibrarySearchable({
  initialSessions,
}: {
  initialSessions: LibrarySessionItem[];
}) {
  const [query, setQuery] = useState("");

  const filtered = initialSessions.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your saved sessions..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none focus:border-indigo-400"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">
          {initialSessions.length === 0
            ? "No sessions yet — create your first one!"
            : "No sessions match your search."}
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-400">
              <tr>
                <th className="px-5 py-3 font-medium">Session</th>
                <th className="px-5 py-3 font-medium">Folder</th>
                <th className="px-5 py-3 font-medium">Cards</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Last Updated</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {session.name}
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {session.folderName || "—"}
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {session.totalCards}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-600">
                      {session.sessionStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400">
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/view-cards?sessionId=${session.id}`}
                      className="mr-2 inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
                    >
                      View Cards
                    </Link>
                    <Link
                      href={`/study?sessionId=${session.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      <Play size={13} />
                      Study
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
