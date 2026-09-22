"use server";

import { authFetch } from "./authFetch";


export async function updateFlashcard(
  flashcardId: string,
  data: { keyword?: string; answer?: string; explanation?: string }
) {
  const res = await authFetch(`/api/flashcards/${flashcardId}`, {
    method: "PUT",
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error("Failed to update flashcard");
  return res.json();
}

export async function deleteFlashcard(flashcardId: string) {
  const res = await authFetch(`/api/flashcards/${flashcardId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete flashcard");
  return res.json();
}