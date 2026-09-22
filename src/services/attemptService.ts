
"use server";

import { authFetch } from "./authFetch";

export async function recordAttempt(payload: {
  flashcardId: string;
   sessionId: string;
  userAnswer: string;
  isCorrect: boolean;
}) {
  try {
    return await authFetch("/api/attempts", {
      method: "POST",
      body: JSON.stringify({
        data: {
          userAnswer: payload.userAnswer,
          isCorrect: payload.isCorrect,
          attemptNumber: 1,
          answeredAt: new Date().toISOString(),
          flashcard: payload.flashcardId,
          session: payload.sessionId,
        },
      }),
    });
  } catch (err) {
    console.error("Failed to record attempt:", err);
    return null;
  }
}