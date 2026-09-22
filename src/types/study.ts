export interface StudyCard {
  id: string;
  keyword: string;
  correctAnswer: string;
  explanation: string;
  category: string;
  sourceLabel: string;
  cardNumber: number;
  totalCards: number;
}

export interface SessionInfo {
  title: string;
  roundLabel: string;
}