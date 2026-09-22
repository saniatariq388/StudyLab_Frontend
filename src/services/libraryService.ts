"use server";

import { serverFetch } from "./serverFetch";

export interface LibrarySessionItem {
  id: string;
  name: string;
  folderName: string | null;
  totalCards: number;
  sessionStatus: string;
  updatedAt: string;
}


export async function getAllSessions(): Promise<LibrarySessionItem[]> {
  const json = await serverFetch(
    "/api/study-sessions?populate=folder&sort=updatedAt:desc&pagination[pageSize]=100"
  );

  return (json.data || []).map((s: any) => ({
    id: s.documentId,
    name: s.name,
    folderName: s.folder?.name || null,
    totalCards: s.totalCards,
    sessionStatus: s.sessionStatus,
    updatedAt: s.updatedAt,
  }));
}