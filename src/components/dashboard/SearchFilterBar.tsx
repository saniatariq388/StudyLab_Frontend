"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const filters = ["All Subjects", "Active Today", "Needs Review"];

export default function SearchFilterBar() {
  const [activeFilter, setActiveFilter] = useState("All Subjects");
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter sessions, topics, keywords (e.g. Krebs, Synapse, Michaelis)..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-16 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-400">
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <button className="rounded-xl border border-gray-200 bg-white p-3 text-gray-500 hover:bg-gray-50">
        <SlidersHorizontal size={18} />
      </button>
    </div>
  );
}