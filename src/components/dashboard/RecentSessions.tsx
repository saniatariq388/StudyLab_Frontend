import { RotateCcw, Play, RefreshCw } from "lucide-react";
import { RecentSession } from "../../types/dashboard";

interface RecentSessionsProps {
  sessions: RecentSession[];
}

const statusConfig = {
  mastered: { icon: RotateCcw, badge: null, badgeColor: "" },
  resume: { icon: Play, badge: "Resume Active", badgeColor: "bg-green-100 text-green-700" },
  review: { icon: RefreshCw, badge: null, badgeColor: "" },
};

export default function RecentSessions({ sessions }: RecentSessionsProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">🕐 Recent Study Sessions</h2>
        <span className="text-xs text-gray-400">Sorted by recent activity</span>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => {
          const config = statusConfig[session.status];
          const Icon = config.icon;

          return (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-100" />

                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                      {session.subject}
                    </span>
                    {config.badge && (
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${config.badgeColor}`}>
                        {config.badge}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">{session.timeAgo}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{session.title}</h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">{session.score}% Score</span>{" "}
                    • {session.cardCount} cards • {session.extraInfo}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                <Icon size={14} />
                {session.actionLabel}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}