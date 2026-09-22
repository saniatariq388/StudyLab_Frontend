import { Layers, Target, CheckCircle2 } from "lucide-react";
import { getAnalyticsOverview, getFolderAccuracy } from "@/src/services/analyticsService";

export default async function AnalyticsRealContent() {
  const [overview, folderStats] = await Promise.all([
    getAnalyticsOverview(),
    getFolderAccuracy(),
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
            <Layers size={18} className="text-indigo-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{overview.totalAttempts}</p>
          <p className="mt-1 text-xs text-gray-500">Total Attempts</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
            <Target size={18} className="text-green-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{overview.overallAccuracy}%</p>
          <p className="mt-1 text-xs text-gray-500">Overall Accuracy</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
            <CheckCircle2 size={18} className="text-orange-500" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{overview.sessionsCompleted}</p>
          <p className="mt-1 text-xs text-gray-500">Sessions Completed</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-gray-900">Accuracy by Folder</h3>
        {folderStats.length === 0 ? (
          <p className="text-sm text-gray-400">No data yet — complete a study session to see stats here.</p>
        ) : (
          <div className="space-y-4">
            {folderStats.map((f) => (
              <div key={f.folderName}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{f.folderName}</span>
                  <span className="text-gray-500">
                    {f.accuracyPercent}% • {f.attemptCount} attempts
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${f.accuracyPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}