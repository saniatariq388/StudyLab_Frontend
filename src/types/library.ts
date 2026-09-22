export interface LibrarySession {
  id: string;
  subject: string;
  folderName: string;
  title: string;
  score: number;
  cardCount: number;
  lastStudied: string;
  status: "mastered" | "resume" | "review";
}