export interface FolderDetail {
  id: string;
  name: string;
  badge: string;
  deckCount: number;
  cardCount: number;
  progressPercent: number;
  colorTheme: "green" | "purple" | "orange" | "blue";
  subFolders: SubFolder[];
}

export interface SubFolder {
  id: string;
  name: string;
  sessionCount: number;
}