export interface SessionResultSummary {
  title: string;
  folderPath: string;
  completedDate: string;
  initialScorePercent: number;
  finalMasteryPercent: number;
  totalCards: number;
  firstRoundCorrect: number;
  mistakesReviewed: number;
  timeSpentLabel: string;
}

export interface MasteredCardItem {
  id: string;
  name: string;
  avgTime: string;
}

export interface ReviewCardItem {
  id: string;
  name: string;
  cardLabel: string;
  userAnswer: string;
  correctAnswer: string;
}

export interface RealSessionResult {
  totalCards: number;
  correctCount: number;
  wrongCount: number;
  masteryPercent: number;
  timeSpentLabel: string;
  mastered: { id: string; keyword: string }[];
  needsReview: { id: string; keyword: string; userAnswer: string; correctAnswer: string }[];
}