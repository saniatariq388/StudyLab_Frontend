export interface DashboardSummary {
  userName: string;
  activeStackName: string;
  sessionsRequiringConsolidation: number;
  decayThresholdDays: number;
}


export interface StatCard {
  label: string;
  value: string;
  subLabel: string;
  trend?: string;
  icon: "progress" | "accuracy" | "intervals";
}

export interface DashboardStats {
  totalCardsMastered: number;
  cardsThisWeek: number;
  retentionRate: number;
  cohortPercentile: string;
  sessionsDue: number;
  estimatedMinutes: number;
}

export interface FolderCard {
  id: string;
  name: string;
  badge: string;
  deckCount: number;
  cardCount: number;
  progressPercent: number;
  colorTheme: "green" | "purple" | "orange" | "blue";
}



export interface RecentSession {
  id: string;
  subject: string;
  timeAgo: string;
  title: string;
  score: number;
  cardCount: number;
  extraInfo: string;
  status: "mastered" | "resume" | "review";
  actionLabel: string;
}

