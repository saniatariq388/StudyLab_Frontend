import Link from "next/link";
import { Minus, Brain, FlaskConical, TrendingUp } from "lucide-react";
import { FolderCard } from "../../types/dashboard";

interface FolderGridProps {
  folders: FolderCard[];
}

const iconMap = {
  green: Minus,
  purple: Brain,
  orange: FlaskConical,
  blue: TrendingUp,
};

const colorClasses = {
  green: { bg: "bg-green-50", text: "text-green-600", bar: "bg-green-500", badge: "bg-green-50 text-green-700" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", bar: "bg-purple-500", badge: "bg-purple-50 text-purple-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", bar: "bg-orange-500", badge: "bg-orange-50 text-orange-700" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", bar: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
};

export default function FolderGrid({ folders }: FolderGridProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">📁 Folders & Subjects</h2>
        <Link href="/folders" className="text-sm font-medium text-indigo-600 hover:underline">
          View all folders →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {folders.map((folder) => {
          const Icon = iconMap[folder.colorTheme];
          const colors = colorClasses[folder.colorTheme];

          return (
            <div key={folder.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}>
                  <Icon size={18} className={colors.text} />
                </div>
                <span className={`rounded-md px-2 py-1 text-xs font-medium ${colors.badge}`}>
                  {folder.badge}
                </span>
              </div>

              <h3 className="mb-1 text-lg font-semibold text-gray-900">{folder.name}</h3>
              <p className="mb-3 text-sm text-gray-500">
                {folder.deckCount} Decks • {folder.cardCount} Cards
              </p>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${colors.bar}`}
                  style={{ width: `${folder.progressPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}