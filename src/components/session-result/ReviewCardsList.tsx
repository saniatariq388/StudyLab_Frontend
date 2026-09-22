import { AlertCircle } from "lucide-react";
import { ReviewCardItem } from "../../types/sessionResult";

interface ReviewCardsListProps {
  cards: ReviewCardItem[];
}

export default function ReviewCardsList({ cards }: ReviewCardsListProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <h3 className="text-sm font-semibold text-gray-900">Needs Further Review</h3>
        <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs text-red-600">
          {cards.length} Cards Missed
        </span>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <div key={card.id} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                <AlertCircle size={14} className="text-red-500" />
                {card.name}
              </span>
              <span className="rounded-md bg-white px-2 py-0.5 text-xs text-gray-400">
                {card.cardLabel}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="mb-1 font-medium text-red-500">✕ Your Answer</p>
                <p className="text-gray-600">&quot;{card.userAnswer}&quot;</p>
              </div>
              <div>
                <p className="mb-1 font-medium text-green-600">✓ Correct Answer</p>
                <p className="text-gray-600">{card.correctAnswer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}