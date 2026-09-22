import { Layers, Target, CheckCircle2, Timer } from "lucide-react";
import { AnalyticsOverview } from "../../types/analytics";

interface OverviewStatsProps {
  data: AnalyticsOverview;
}

export default function OverviewStats({ data }: OverviewStatsProps) {
  const stats = [
    { label: "Cards Studied", value: data.totalCardsStudied, icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Overall Accuracy", value: `${data.overallAccuracy}%`, icon: Target, color: "text-green-600", bg: "bg-green-50" },
    { label: "Sessions Completed", value: data.totalSessionsCompleted, icon: CheckCircle2, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Avg. Time / Card", value: data.avgTimePerCard, icon: Timer, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
              <Icon size={18} className={stat.color} />
            </div>
            <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}