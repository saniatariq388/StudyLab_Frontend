import { FlaskConical, X } from "lucide-react";
import Link from "next/link";
import { SessionInfo } from "../../types/study";

interface StudyHeaderProps {
  session: SessionInfo;
  cardNumber: number;
  totalCards: number;
}

export default function StudyHeader({ session, cardNumber, totalCards }: StudyHeaderProps) {
  const progressPercent = (cardNumber / totalCards) * 100;

  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
          <FlaskConical size={18} className="text-indigo-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">{session.title}</h1>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
              {session.roundLabel}
            </span>
          </div>
          <p className="text-xs text-gray-400">Active recall rehearsal • High cognitive retention mode</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-40">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-gray-400">Progress</span>
            <span className="font-medium text-gray-700">
              Card {cardNumber} of {totalCards}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-indigo-600" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600">
          <X size={16} />
          Exit Session
        </Link>
      </div>
    </div>
  );
}