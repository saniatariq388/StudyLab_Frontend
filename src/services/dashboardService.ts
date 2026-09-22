import { serverFetch } from "./serverFetch";

export interface DashboardStats {
  totalCardsMastered: number;
  totalAttempts: number;
  accuracyPercent: number;
  sessionsInProgress: number;
}

export interface RecentSessionItem {
  id: string;
  name: string;
  totalCards: number;
  sessionStatus: string;
  createdAt: string;
}

export interface FolderSummary {
  id: string;
  name: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const attemptsJson = await serverFetch("/api/attempts");
  const attempts = attemptsJson.data || [];

  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((a: any) => a.isCorrect).length;
  const accuracyPercent = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  const sessionsJson = await serverFetch("/api/study-sessions");
  const allSessions = sessionsJson.data || [];
  const sessionsInProgress = allSessions.filter((s: any) => s.sessionStatus !== "completed").length;

  return {
    totalCardsMastered: correctAttempts,
    totalAttempts,
    accuracyPercent,
    sessionsInProgress,
  };
}

export async function getRecentSessions(): Promise<RecentSessionItem[]> {
  const json = await serverFetch("/api/study-sessions?sort=createdAt:desc&pagination[pageSize]=5");
  return (json.data || []).map((s: any) => ({
    id: s.documentId,
    name: s.name,
    totalCards: s.totalCards,
    sessionStatus: s.sessionStatus,
    createdAt: s.createdAt,
  }));
}

export async function getFolderSummaries(): Promise<FolderSummary[]> {
  const json = await serverFetch("/api/study-folders");
  return (json.data || []).map((f: any) => ({
    id: f.documentId,
    name: f.name,
  }));
}