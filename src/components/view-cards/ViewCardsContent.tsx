import { getSessionFlashcards } from "@/src/services/studyService";

export default async function ViewCardsContent({ sessionId }: { sessionId?: string }) {
  if (!sessionId) {
    return <p className="text-sm text-red-500">No session specified.</p>;
  }

  const cards = await getSessionFlashcards(sessionId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Flashcards</h1>
        <p className="mt-1 text-sm text-gray-500">{cards.length} cards in this session</p>
      </div>

      {cards.length === 0 ? (
        <p className="text-sm text-gray-400">No flashcards found for this session.</p>
      ) : (
        <div className="space-y-3">
          {cards.map((card, i) => (
            <div key={card.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-1 text-xs font-medium text-gray-400">Card {i + 1}</p>
              <p className="mb-2 font-semibold text-gray-900">{card.keyword}</p>
              <p className="text-sm text-gray-600">{card.answer}</p>
              {card.explanation && (
                <p className="mt-2 text-xs text-indigo-600">📖 {card.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}