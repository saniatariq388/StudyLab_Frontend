import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroLanding() {
  return (
    <section className="mx-auto max-w-5xl px-8 py-20 text-center">
      <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-700">
        <Sparkles size={14} />
        AI-Powered Flashcard Generation
      </div>

      <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
        Turn Your Notes Into Flashcards, Instantly.
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-500">
        Snap a photo of a book page, paste your typed notes, or upload a scanned document.
        StudyLab&apos;s AI extracts the key concepts and turns them into recall flashcards —
        so you spend less time formatting and more time actually learning.
      </p>

      <div className="flex items-center justify-center gap-4">
        <Link
          href="/signup"
          className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Get Started Free
        </Link>
        <Link
          href="/login"
          className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Log In
        </Link>
      </div>
    </section>
  );
}