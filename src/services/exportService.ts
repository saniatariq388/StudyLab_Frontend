"use server";

import { authFetch } from "./authFetch";

export interface ExportCard {
  keyword: string;
  answer: string;
  explanation: string;
}

export async function getFlashcardsForExport(sessionId: string): Promise<ExportCard[]> {
  const json = await authFetch(
    `/api/flashcards?filters[studySession][documentId]=${sessionId}&sort=order:asc`
  );

  return (json.data || []).map((card: any) => ({
    keyword: card.keyword,
    answer: card.answer,
    explanation: card.explanation || "",
  }));
}