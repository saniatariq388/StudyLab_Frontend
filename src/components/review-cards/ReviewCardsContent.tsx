"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { getSessionFlashcards, RealFlashcard } from "@/src/services/studyService";
import { updateFlashcard, deleteFlashcard } from "@/src/services/flashcardService";

export default function ReviewCardsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("sessionId");

  const [cards, setCards] = useState<RealFlashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editKeyword, setEditKeyword] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  useEffect(() => {
    if (!sessionId) return;
    getSessionFlashcards(sessionId)
      .then(setCards)
      .finally(() => setLoading(false));
  }, [sessionId]);

  const startEdit = (card: RealFlashcard) => {
    setEditingId(card.id);
    setEditKeyword(card.keyword);
    setEditAnswer(card.answer);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (cardId: string) => {
    await updateFlashcard(cardId, { keyword: editKeyword, answer: editAnswer });
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, keyword: editKeyword, answer: editAnswer } : c))
    );
    setEditingId(null);
  };

  const handleDelete = async (cardId: string) => {
    if (!confirm("Delete this flashcard?")) return;
    await deleteFlashcard(cardId);
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  if (loading) return <p className="text-sm text-gray-500">Loading flashcards...</p>;

  if (cards.length === 0) {
    return <p className="text-sm text-gray-400">No flashcards left. Go back and generate again.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">{cards.length} flashcards generated</p>
        <button
          onClick={() => router.push(`/study?sessionId=${sessionId}`)}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Start Studying →
        </button>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <div key={card.id} className="rounded-2xl bg-white p-4 shadow-sm">
            {editingId === card.id ? (
              <div className="space-y-2">
                <input
                  value={editKeyword}
                  onChange={(e) => setEditKeyword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-indigo-400"
                  placeholder="Keyword"
                />
                <textarea
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                  placeholder="Answer"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
                  >
                    <X size={13} />
                    Cancel
                  </button>
                  <button
                    onClick={() => saveEdit(card.id)}
                    className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                  >
                    <Check size={13} />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">{card.keyword}</p>
                  <p className="mt-1 text-sm text-gray-600">{card.answer}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => startEdit(card)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-indigo-600"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}