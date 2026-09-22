import { Layers, Brain, Clock } from "lucide-react";
import { DashboardStats } from "@/src/types/dashboard";

interface StatsRowProps {
  data: DashboardStats;
}

export default function StatsRow({ data }: StatsRowProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Total Progress */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Total Progress
          </p>
          <div className="rounded-lg bg-indigo-50 p-2">
            <Layers size={16} className="text-indigo-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-gray-900">
          {data.totalCardsMastered} <span className="text-base font-normal text-gray-500">Cards Mastered</span>
        </p>
        <p className="mt-1 text-xs font-medium text-green-600">
          ↗ +{data.cardsThisWeek} cards this week
        </p>
      </div>

      {/* Memory Accuracy */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Memory Accuracy
          </p>
          <div className="rounded-lg bg-green-50 p-2">
            <Brain size={16} className="text-green-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-gray-900">
          {data.retentionRate}% <span className="text-base font-normal text-gray-500">Retention Rate</span>
        </p>
        <p className="mt-1 text-xs font-medium text-gray-500">
          {data.cohortPercentile} across cohort
        </p>
      </div>

      {/* Spaced Intervals */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Spaced Intervals
          </p>
          <div className="rounded-lg bg-orange-50 p-2">
            <Clock size={16} className="text-orange-600" />
          </div>
        </div>
        <p className="text-2xl font-semibold text-gray-900">
          {data.sessionsDue} <span className="text-base font-normal text-gray-500">Sessions Due</span>
        </p>
        <p className="mt-1 text-xs font-medium text-gray-500">
          Est. {data.estimatedMinutes} mins required
        </p>
      </div>
    </div>
  );
}