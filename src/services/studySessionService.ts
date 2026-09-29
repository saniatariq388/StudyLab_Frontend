  "use server";

import { authFetch } from "./authFetch";

export async function createStudySession(payload: {
  name: string;
  folder?: string;
}) {
  const json = await authFetch("/api/study-sessions", {
    method: "POST",
    body: JSON.stringify({
      data: {
        name: payload.name,
        totalCards: 0,
        completedCards: 0,
        correctCount: 0,
        wrongCount: 0,
        sessionStatus: "draft",
        ...(payload.folder ? { folder: payload.folder } : {}),
      },
    }),
  });

  return json.data;
}

export async function generateFlashcards(payload: {
  extractedText: string;
  studySessionId: string;
  density: "core" | "detailed";
  imageIds?: number[]; // FIX: naya optional field add kiya, taake uploaded images ke IDs bhi backend ko bhej sakein
}) {
  return authFetch("/api/generate-flashcards", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


export async function markSessionCompleted(sessionId: string) {
  return authFetch(`/api/study-sessions/${sessionId}`, {
    method: "PUT",
    body: JSON.stringify({ data: { sessionStatus: "completed" } }),
  });
}