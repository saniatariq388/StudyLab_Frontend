"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StudyHeader from "./StudyHeader";
import FlashcardStudy from "./FlashcardStudy";
import { getSessionFlashcards, RealFlashcard } from "@/src/services/studyService";
import { markSessionCompleted } from "@/src/services/studySessionService";

export default function StudySessionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("sessionId");

  const [currentRoundCards, setCurrentRoundCards] = useState<RealFlashcard[]>([]);
  const [wrongCards, setWrongCards] = useState<RealFlashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("No session selected.");
      setLoading(false);
      return;
    }

    getSessionFlashcards(sessionId)
      .then((data) => {
        if (data.length === 0) {
          setError("No flashcards found for this session.");
        }
        setCurrentRoundCards(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [sessionId]);

   const finishSession = async () => {
    try {
      await markSessionCompleted(sessionId!);
    } catch (err) {
      console.error("Failed to mark session completed:", err);
    }
    router.push(`/session-complete?sessionId=${sessionId}`);
  };

  const handleNext = async (isCorrect: boolean) => {
    const isLastOfRound = currentIndex + 1 >= currentRoundCards.length;

    const updatedWrongCards = isCorrect
      ? wrongCards
      : [...wrongCards, currentRoundCards[currentIndex]];

    if (isLastOfRound) {
      if (updatedWrongCards.length === 0) {
        await markSessionCompleted(sessionId!);
        router.push(`/session-complete?sessionId=${sessionId}`);
      } else {
        setCurrentRoundCards(updatedWrongCards);
        setWrongCards([]);
        setCurrentIndex(0);
        setRound((r) => r + 1);
      }
    } else {
      setWrongCards(updatedWrongCards);
      setCurrentIndex((i) => i + 1);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading flashcards...</p>;
  }

  if (error || currentRoundCards.length === 0) {
    return <p className="text-sm text-red-500">{error || "No cards to study."}</p>;
  }

  const card = currentRoundCards[currentIndex];
  const isLastCardOfRound = currentIndex + 1 >= currentRoundCards.length;

  return (
    <>
      <StudyHeader
        session={{
          title: "Study Session",
          roundLabel: round === 1 ? "Round 1 (Initial Test)" : `Round ${round} (Review Mistakes)`,
        }}
        cardNumber={currentIndex + 1}
        totalCards={currentRoundCards.length}
      />
      <FlashcardStudy
        card={{
          id: card.id,
          keyword: card.keyword,
          correctAnswer: card.answer,
          explanation: card.explanation || "",
          category: "Generated Flashcard",
          sourceLabel: "AI Generated",
          cardNumber: currentIndex + 1,
          totalCards: currentRoundCards.length,
        }}
        sessionId={sessionId!}
        onNext={handleNext}
        onFinishNow={finishSession}
        isLastCardOfRound={isLastCardOfRound}
        wrongCountSoFarInRound={wrongCards.length}
      />
    </>
  );
}