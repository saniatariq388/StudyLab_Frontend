"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Lightbulb, BookOpen, Circle } from "lucide-react";
import { getCardTheme } from "@/src/lib/cardColors";
import { recordAttempt } from "@/src/services/attemptService";
import { StudyCard } from "@/src/types/study";

interface FlashcardStudyProps {
  card: StudyCard;
  sessionId: string;
  onNext: (isCorrect: boolean) => void;
  onFinishNow: () => void;
  isLastCardOfRound: boolean;
  wrongCountSoFarInRound: number;
}

export default function FlashcardStudy({
  card,
  sessionId,
  onNext,
  onFinishNow,
  isLastCardOfRound,
  wrongCountSoFarInRound,
}: FlashcardStudyProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const theme = getCardTheme(card.id);
  const willFinishSession = isLastCardOfRound && wrongCountSoFarInRound === 0 && isCorrect;
  const willStartReviewRound = isLastCardOfRound && (wrongCountSoFarInRound > 0 || !isCorrect);



  const handleSubmit = async () => {
    if (!answer.trim()) return;

    const correct = evaluateAnswer(answer, card.correctAnswer);
    setIsCorrect(correct);
    setSubmitted(true);

    recordAttempt({
      flashcardId: card.id,
      sessionId,
      userAnswer: answer,
      isCorrect: correct,
    });
  };

  const handleNextClick = () => {
    setAnswer("");
    setSubmitted(false);
    onNext(isCorrect);
  };

 
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className={`flex flex-col rounded-2xl border ${theme.bg} ${theme.border} p-6 shadow-sm`}>
        <div className="mb-6 flex items-center justify-between">
          <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${theme.badge}`}>
            ● {card.category}
          </span>
          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
            <Lightbulb size={14} />
            Need a hint?
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
            Concept Prompt
          </p>
          <h2 className="mb-4 text-4xl font-bold text-gray-900">{card.keyword}</h2>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <BookOpen size={13} />
            {card.sourceLabel}
          </span>
          <span className="flex items-center gap-1">
            <Circle size={8} className={`fill-current ${theme.accent}`} />
            Active Target
          </span>
        </div>

        <div className="mt-6 rounded-xl bg-white/70 p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-gray-500">Your Explicit Retrieval Entry</label>
          </div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={submitted}
            rows={3}
            placeholder="Type your answer..."
            className="w-full resize-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400">↵ Enter to evaluate</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAnswer("")}
                disabled={submitted}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                Submit Answer →
              </button>
            </div>
          </div>
        </div>
      </div>

      {!submitted ? (
        <div className="flex items-center justify-center rounded-2xl bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
          Submit your answer to see the result.
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div
            className={`mb-4 flex items-center gap-2 rounded-xl p-3 ${
              isCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 size={18} className="text-green-600" />
                <p className="text-sm font-medium text-green-700">Correct!</p>
              </>
            ) : (
              <>
                <XCircle size={18} className="text-red-600" />
                <p className="text-sm font-medium text-red-700">
                  Not quite right — this will come back for review.
                </p>
              </>
            )}
          </div>

          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
            Correct Explanation
          </p>
          <div className="mb-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">{card.correctAnswer}</div>

          {card.explanation && (
            <div className="mb-5 rounded-xl bg-indigo-50 p-3 text-xs text-indigo-700">
              📖 {card.explanation}
            </div>
          )}

          <button
            onClick={handleNextClick}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {willFinishSession
              ? "Finish Session →"
              : willStartReviewRound
              ? "Start Review Round →"
              : "Next Card →"}
          </button>

          {willStartReviewRound && (
            <button
              onClick={onFinishNow}
              className="mt-2 w-full rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
            >
              Finish Now (Skip Review)
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function evaluateAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3);

  const userWords = new Set(normalize(userAnswer));
  const correctWords = normalize(correctAnswer);

  if (correctWords.length === 0) return false;

  const matchCount = correctWords.filter((word) => userWords.has(word)).length;
  return matchCount / correctWords.length >= 0.35;
}