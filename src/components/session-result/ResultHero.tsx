import { CheckCircle2 } from "lucide-react";
import { SessionResultSummary } from "../../types/sessionResult";

interface ResultHeroProps {
  data: SessionResultSummary;
}

export default function ResultHero({ data }: ResultHeroProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (data.initialScorePercent / 100) * circumference;

  return (
    <div className="mb-6 rounded-2xl bg-linear-to-br from-emerald-50 to-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            <CheckCircle2 size={14} />
            Session Completed • Round 1 &amp; Review Finished
          </span>
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">{data.title}</h1>
          <p className="max-w-xl text-sm text-gray-500">
            Excellent retention phase. You mastered {data.firstRoundCorrect} concepts on your initial
            run and successfully reconciled all flagged anomalies during targeted reinforcement.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <span className="rounded-md bg-white px-2 py-1">{data.folderPath}</span>
            <span className="rounded-md bg-white px-2 py-1">{data.completedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#ECFDF5" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#059669"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{data.initialScorePercent}%</span>
              <span className="text-[9px] uppercase text-gray-400">Initial Pass</span>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-900">
              {data.finalMasteryPercent}% <span className="text-sm font-normal text-gray-500">Final Mastery</span>
            </p>
            <p className="text-xs text-gray-400">
              {data.firstRoundCorrect}/{data.totalCards} initial score, {data.mistakesReviewed} repaired in rapid cycle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}