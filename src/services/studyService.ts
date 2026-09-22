"use server";

import { serverFetch } from "./serverFetch";

export interface RealFlashcard {
  id: string;
  keyword: string;
  answer: string;
  explanation: string;
  order: number;
}

export async function getSessionFlashcards(sessionId: string): Promise<RealFlashcard[]> {
  const json = await serverFetch(
    `/api/flashcards?filters[studySession][documentId]=${sessionId}&sort=order:asc`
  );

  return (json.data || []).map((item: any) => ({
    id: item.documentId,
    keyword: item.keyword,
    answer: item.answer,
    explanation: item.explanation,
    order: item.order,
  }));
}