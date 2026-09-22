import Header from "@/src/components/header";
import ReviewCardsContent from "@/src/components/review-cards/ReviewCardsContent";

export default function ReviewCardsPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-3xl px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Review Your Flashcards</h1>
          <p className="mt-1 text-sm text-gray-500">
            Edit or remove any cards before starting your study session.
          </p>
        </div>
        <ReviewCardsContent />
      </main>
    </div>
  );
}