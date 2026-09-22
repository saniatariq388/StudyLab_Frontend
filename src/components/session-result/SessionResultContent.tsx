"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResultActions from "./ResultActions";
import { getSessionResult } from "@/src/services/sessionResultService";
import { RealSessionResult } from "@/src/types/sessionResult";
import { CheckCircle2, AlertCircle, Layers, Timer } from "lucide-react";

export default function SessionResultContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [result, setResult] = useState<RealSessionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("No session found.");
      setLoading(false);
      return;
    }

    getSessionResult(sessionId)
      .then(setResult)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading results...</p>;
  }

  if (error || !result) {
    return <p className="text-sm text-red-500">{error || "No results available."}</p>;
  }

  return (
    <>
      <div className="rounded-2xl bg-linear-to-br from-emerald-50 to-white p-6">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          <CheckCircle2 size={14} />
          Session Completed
        </span>
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          {result.masteryPercent}% Mastery — {result.correctCount} of {result.totalCards} Correct
        </h1>
        <p className="max-w-xl text-sm text-gray-500">
          {result.wrongCount === 0
            ? "Perfect run! You got every card right on the first try."
            : `You got ${result.correctCount} right and ${result.wrongCount} wrong. Review the missed cards below to reinforce them.`}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Total Cards</p>
            <Layers size={16} className="text-gray-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{result.totalCards}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Correct</p>
            <CheckCircle2 size={16} className="text-green-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{result.correctCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Wrong</p>
            <AlertCircle size={16} className="text-red-500" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{result.wrongCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Time Spent</p>
            <Timer size={16} className="text-indigo-600" />
          </div>
          <p className="text-xl font-semibold text-gray-900">{result.timeSpentLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <h3 className="text-sm font-semibold text-gray-900">Needs Further Review</h3>
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs text-red-600">
              {result.needsReview.length} Cards Missed
            </span>
          </div>

          {result.needsReview.length === 0 ? (
            <p className="text-sm text-gray-400">No mistakes — great job!</p>
          ) : (
            <div className="space-y-3">
              {result.needsReview.map((card) => (
                <div key={card.id} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p className="mb-2 text-sm font-medium text-gray-900">{card.keyword}</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="mb-1 font-medium text-red-500">✕ Your Answer</p>
                      <p className="text-gray-600">&quot;{card.userAnswer}&quot;</p>
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-green-600">✓ Correct Answer</p>
                      <p className="text-gray-600">{card.correctAnswer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Mastered Cards
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs text-green-700">
              {result.mastered.length} / {result.totalCards}
            </span>
          </h3>

          {result.mastered.length === 0 ? (
            <p className="text-sm text-gray-400">No cards mastered yet — keep practicing!</p>
          ) : (
            <div className="space-y-1">
              {result.mastered.map((card) => (
                <div key={card.id} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50">
                  <CheckCircle2 size={15} className="text-green-500" />
                  <span className="text-gray-700">{card.keyword}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ResultActions sessionId={sessionId!} />
    </>
  );
}