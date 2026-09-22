import { CheckCircle2 } from "lucide-react";
import { MasteredCardItem } from "../../types/sessionResult";

interface MasteredCardsListProps {
  cards: MasteredCardItem[];
}

export default function MasteredCardsList({ cards }: MasteredCardsListProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Mastered Cards
          <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs text-green-700">
            {cards.length} / {cards.length}
          </span>
        </h3>
        <button className="text-xs font-medium text-indigo-600 hover:underline">Expand All</button>
      </div>

      <div className="space-y-1">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-50">
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle2 size={15} className="text-green-500" />
              {card.name}
            </span>
            <span className="text-xs text-gray-400">{card.avgTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
}