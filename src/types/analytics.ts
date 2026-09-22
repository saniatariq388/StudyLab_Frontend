export interface SubjectPerformance {
  id: string;
  subject: string;
  accuracyPercent: number;
  cardsStudied: number;
  colorTheme: "green" | "purple" | "orange" | "blue";
}

export interface AnalyticsOverview {
  totalCardsStudied: number;
  overallAccuracy: number;
  totalSessionsCompleted: number;
  avgTimePerCard: string;
}

export interface WeeklyActivity {
  day: string;
  cardsStudied: number;
}