"use server";

import { serverFetch } from "./serverFetch";

export interface RealSessionResult {
  totalCards: number;
  correctCount: number;
  wrongCount: number;
  masteryPercent: number;
  timeSpentLabel: string;
  mastered: { id: string; keyword: string }[];
  needsReview: { id: string; keyword: string; userAnswer: string; correctAnswer: string }[];
}


export async function getSessionResult(sessionId: string): Promise<RealSessionResult> {
  const json = await serverFetch(
    `/api/attempts?filters[session][documentId]=${sessionId}&populate[flashcard]=*&sort=answeredAt:asc`
  );

  const attempts = json.data || [];

  const totalCards = attempts.length;
  const correctAttempts = attempts.filter((a: any) => a.isCorrect);
  const wrongAttempts = attempts.filter((a: any) => !a.isCorrect);

  const correctCount = correctAttempts.length;
  const wrongCount = wrongAttempts.length;
  const masteryPercent = totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;

  let timeSpentLabel = "—";
   if (attempts.length >= 2) {
    const first = new Date(attempts[0].answeredAt).getTime();
    const last = new Date(attempts[attempts.length - 1].answeredAt).getTime();
    const diffSeconds = Math.max(0, Math.round((last - first) / 1000));
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;
    timeSpentLabel = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  }

  const mastered = correctAttempts.map((a: any) => ({
    id: a.flashcard?.documentId,
    keyword: a.flashcard?.keyword,
  }));

  const needsReview = wrongAttempts.map((a: any) => ({
    id: a.flashcard?.documentId,
    keyword: a.flashcard?.keyword,
    userAnswer: a.userAnswer,
    correctAnswer: a.flashcard?.answer,
  }));

  return {
    totalCards,
    correctCount,
    wrongCount,
    masteryPercent,
    timeSpentLabel,
    mastered,
    needsReview,
  };
}