"use client";

import { useState } from "react";
import { ChevronDown, Minus, Brain, FlaskConical, TrendingUp, Plus } from "lucide-react";
import { FolderDetail } from "../../types/folders";

interface FolderDetailCardProps {
  folder: FolderDetail;
}

const iconMap = { green: Minus, purple: Brain, orange: FlaskConical, blue: TrendingUp };
const colorClasses = {
  green: { bg: "bg-green-50", text: "text-green-600", bar: "bg-green-500", badge: "bg-green-50 text-green-700" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", bar: "bg-purple-500", badge: "bg-purple-50 text-purple-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", bar: "bg-orange-500", badge: "bg-orange-50 text-orange-700" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", bar: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
};

export default function FolderDetailCard({ folder }: FolderDetailCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[folder.colorTheme];
  const colors = colorClasses[folder.colorTheme];

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between text-left"
      >
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}>
            <Icon size={18} className={colors.text} />
          </div>
          <div>
            <div className="mb-0.5 flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-900">{folder.name}</h3>
              <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                {folder.badge}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {folder.deckCount} Decks • {folder.cardCount} Cards
            </p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${folder.progressPercent}%` }} />
      </div>

      {expanded && (
        <div className="mt-4 space-y-1 border-t border-gray-100 pt-4">
          {folder.subFolders.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-gray-50"
            >
              <span className="text-gray-700">📁 {sub.name}</span>
              <span className="text-xs text-gray-400">{sub.sessionCount} sessions</span>
            </div>
          ))}
          <button className="mt-2 flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
            <Plus size={14} />
            Add Subfolder
          </button>
        </div>
      )}
    </div>
  );
}