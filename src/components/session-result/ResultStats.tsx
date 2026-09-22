import { Layers, CheckCircle2, ClipboardCheck, Timer } from "lucide-react";
import { SessionResultSummary } from "../../types/sessionResult";

interface ResultStatsProps {
  data: SessionResultSummary;
}

export default function ResultStats({ data }: ResultStatsProps) {
  const stats = [
    { label: "Total Cards", value: data.totalCards, sub: "Standard Deck Partition", icon: Layers, color: "text-gray-600" },
    { label: "First-Round Correct", value: `${data.firstRoundCorrect} Cards`, sub: `${data.firstRoundCorrect}/${data.totalCards} accuracy`, icon: CheckCircle2, color: "text-green-600" },
    { label: "Mistakes Reviewed", value: `${data.mistakesReviewed} Cards`, sub: "Targeted and re-evaluated", icon: ClipboardCheck, color: "text-orange-500" },
    { label: "Time Spent", value: data.timeSpentLabel, sub: "Avg pace per flashcard", icon: Timer, color: "text-indigo-600" },
  ];

  return (
    <div className="mb-6 grid grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{stat.label}</p>
              <Icon size={16} className={stat.color} />
            </div>
            <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-400">{stat.sub}</p>
          </div>
        );
      })}
    </div>
  );
}