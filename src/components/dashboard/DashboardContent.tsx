import Link from "next/link";
import { Layers, Target, Clock, FolderOpen } from "lucide-react";
import { getDashboardStats, getRecentSessions, getFolderSummaries } from "@/src/services/dashboardService";
import { getCurrentUser } from "@/src/services/user";

export default async function DashboardContent() {
  const [user, stats, sessions, folders] = await Promise.all([
    getCurrentUser().catch(() => null),
    getDashboardStats(),
    getRecentSessions(),
    getFolderSummaries(),
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-linear-to-br from-indigo-50 to-white p-6">
        <p className="mb-1 text-xs font-medium text-gray-500">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Welcome back, {user?.username || "Guest"}. What do you want to revise today?
        </h1>
        <Link
          href="/create-session"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + Create New Session
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase text-gray-400">Cards Mastered</p>
            <Layers size={16} className="text-indigo-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.totalCardsMastered}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase text-gray-400">Accuracy</p>
            <Target size={16} className="text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.accuracyPercent}%</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase text-gray-400">Sessions In Progress</p>
            <Clock size={16} className="text-orange-500" />
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stats.sessionsInProgress}</p>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">📁 Folders</h2>
          <Link href="/folders" className="text-sm font-medium text-indigo-600 hover:underline">
            View all →
          </Link>
        </div>
        {folders.length === 0 ? (
          <p className="text-sm text-gray-400">No folders yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {folders.slice(0, 4).map((folder) => (
              <div key={folder.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  <FolderOpen size={18} className="text-indigo-600" />
                </div>
                <p className="font-medium text-gray-900">{folder.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-900">🕐 Recent Study Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-sm text-gray-400">No sessions yet. Create your first one!</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                <div>
                  <p className="font-semibold text-gray-900">{session.name}</p>
                  <p className="text-xs text-gray-400">
                    {session.totalCards} cards • {session.sessionStatus}
                  </p>
                </div>
                <Link
                  href={`/study?sessionId=${session.id}`}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Study
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}