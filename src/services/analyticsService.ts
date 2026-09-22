"use server";

import { serverFetch } from "./serverFetch";

export interface AnalyticsOverview {
  totalAttempts: number;
  overallAccuracy: number;
  sessionsCompleted: number;
}

export interface FolderAccuracy {
  folderName: string;
  accuracyPercent: number;
  attemptCount: number;
}


export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const attemptsJson = await serverFetch("/api/attempts");
  const attempts = attemptsJson.data || [];

  const totalAttempts = attempts.length;
  const correct = attempts.filter((a: any) => a.isCorrect).length;
  const overallAccuracy = totalAttempts > 0 ? Math.round((correct / totalAttempts) * 100) : 0;

  const sessionsJson = await serverFetch(
    "/api/study-sessions?filters[sessionStatus][$eq]=completed"
  );
  const sessionsCompleted = (sessionsJson.data || []).length;

  return { totalAttempts, overallAccuracy, sessionsCompleted };
}



export async function getFolderAccuracy(): Promise<FolderAccuracy[]> {
  const json = await serverFetch(
    "/api/attempts?populate[session][populate]=folder"
  );
  const attempts = json.data || [];

  const grouped: Record<string, { correct: number; total: number }> = {};

  attempts.forEach((a: any) => {
    const folderName = a.session?.folder?.name || "Unfiled";
    if (!grouped[folderName]) grouped[folderName] = { correct: 0, total: 0 }; //kya is folder-naam ke liye humne pehle se grouped object mein entry banayi hai?" Agar nahi banayi (pehli baar aa raha hai ye folder), to naya entry banao { correct: 0, total: 0 } (shuru mein dono zero).

    grouped[folderName].total += 1
    if (a.isCorrect) grouped[folderName].correct += 1;
  });

   return Object.entries(grouped).map(([folderName, stats]) => ({
    folderName,
    accuracyPercent: Math.round((stats.correct / stats.total) * 100),
    attemptCount: stats.total,
  }));
}




//---------------------record type

// aan, Record<> TypeScript ka built-in utility type hai — function nahi
// Record<K, V>

// Bina Record ke bhi likh sakte the (equivalent)
// typescript
// const grouped: { [key: string]: { correct: number; total: number } } = {};
// Ye index signature wala purana/verbose tareeqa hai