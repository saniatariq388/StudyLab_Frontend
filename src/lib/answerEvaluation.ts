// Lightweight evaluation — NOT true semantic matching (that would need an AI call).
// Compares meaningful word overlap between the user's answer and the correct answer.
// Good enough for MVP; can be upgraded to AI-based semantic matching later.

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3); // ignore small filler words (a, is, the, of...)
}

export function evaluateAnswer(userAnswer: string, correctAnswer: string): boolean {
  const userWords = new Set(normalize(userAnswer));
  const correctWords = normalize(correctAnswer);

  if (correctWords.length === 0) return false;

  const matchCount = correctWords.filter((word) => userWords.has(word)).length;
  const overlapRatio = matchCount / correctWords.length;

  // Consider correct if at least 35% of the key words from the correct answer appear
  return overlapRatio >= 0.35;
}