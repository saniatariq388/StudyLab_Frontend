import { DashboardSummary, DashboardStats, FolderCard } from "../types/dashboard";
import { RecentSession } from "../types/dashboard";
import { UploadedPage, GenerationEstimate } from "../types/createSession";
import { StudyCard, SessionInfo } from "../types/study";
import { SessionResultSummary, MasteredCardItem, ReviewCardItem } from "../types/sessionResult";
import { FolderDetail } from "../types/folders";
import { LibrarySession } from "../types/library";
import { SubjectPerformance, AnalyticsOverview, WeeklyActivity } from "../types/analytics";



// ⚠️ TEMPORARY — used only to replicate Figma UI during frontend development.
// This is NOT seeded into Strapi and is NOT the default data for real users.
// Real users start with an empty dashboard (see services/dashboardService.ts).

export const MOCK_DASHBOARD_SUMMARY: DashboardSummary = {
  userName: "Alex",
  activeStackName: "Cellular Biology",
  sessionsRequiringConsolidation: 3,
  decayThresholdDays: 14,
};

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalCardsMastered: 42,
  cardsThisWeek: 8,
  retentionRate: 89,
  cohortPercentile: "Top 5%",
  sessionsDue: 3,
  estimatedMinutes: 22,
};

export const MOCK_FOLDERS: FolderCard[] = [
  {
    id: "1",
    name: "Biology & Medicine",
    badge: "BIO-MED",
    deckCount: 18,
    cardCount: 240,
    progressPercent: 72,
    colorTheme: "green",
  },
  {
    id: "2",
    name: "Cognitive Neuroscience",
    badge: "NEURO",
    deckCount: 9,
    cardCount: 114,
    progressPercent: 45,
    colorTheme: "purple",
  },
  {
    id: "3",
    name: "Organic Chemistry",
    badge: "CHEM",
    deckCount: 14,
    cardCount: 192,
    progressPercent: 30,
    colorTheme: "orange",
  },
  {
    id: "4",
    name: "Microeconomics",
    badge: "ECON",
    deckCount: 6,
    cardCount: 85,
    progressPercent: 55,
    colorTheme: "blue",
  },
];

export const MOCK_RECENT_SESSIONS: RecentSession[] = [
  {
    id: "1",
    subject: "Biology • Bioenergetics",
    timeAgo: "2 hours ago",
    title: "Cellular Respiration & Krebs Cycle",
    score: 92,
    cardCount: 18,
    extraInfo: "Avg. 4.2s per card",
    status: "mastered",
    actionLabel: "Study Again",
  },
  {
    id: "2",
    subject: "Neuroscience",
    timeAgo: "Yesterday",
    title: "Synaptic Plasticity & LTP",
    score: 78,
    cardCount: 24,
    extraInfo: "14 / 24 Reviewed",
    status: "resume",
    actionLabel: "Resume Session",
  },
  {
    id: "3",
    subject: "Chemistry",
    timeAgo: "3 days ago",
    title: "Enzyme Kinetics & Michaelis-Menten",
    score: 85,
    cardCount: 15,
    extraInfo: "Lineweaver-Burk emphasis",
    status: "review",
    actionLabel: "Review Decay",
  },
];


export const MOCK_UPLOADED_PAGES: UploadedPage[] = [
  {
    id: "1",
    fileName: "Campbells_Bio_p164.jpg",
    fileSizeKB: 420,
    pageLabel: "Page 164",
    ocrStatus: "OCR Ready • 4 Mechanisms",
  },
  {
    id: "2",
    fileName: "Campbells_Bio_p165.jpg",
    fileSizeKB: 512,
    pageLabel: "Page 165",
    ocrStatus: "OCR Ready • 6 Key Terms",
  },
  {
    id: "3",
    fileName: "Lecture_Notes_Krebs.png",
    fileSizeKB: 488,
    pageLabel: "Lecture 8",
    ocrStatus: "OCR Ready • Handwritten Verified",
  },
];

export const MOCK_GENERATION_ESTIMATE: GenerationEstimate = {
  estimatedCards: 14,
  mechanismsCount: 8,
  termsCount: 4,
  yieldEquationsCount: 2,
  estimatedSeconds: 4.8,
};


// export const MOCK_SESSION_INFO: SessionInfo = {
//   title: "Cell Structure & Organelles",
//   roundLabel: "Round 1 (Initial Test)",
// };

// export const MOCK_STUDY_CARD: StudyCard = {
//   id: "1",
//   keyword: "Mitochondria",
//   correctAnswer:
//     "The double-membrane-bound organelle responsible for generating most of the chemical energy needed to power the cell's biochemical reactions in the form of ATP (adenosine triphosphate).",
//   explanation: "Campbell Biology, 12th Ed., Chapter 6, p. 109",
//   category: "Organelle Function & Metabolism",
//   sourceLabel: "Ch. 6 • Cellular Eukaryotes",
//   cardNumber: 4,
//   totalCards: 12,
// };



// export const MOCK_SESSION_RESULT: SessionResultSummary = {
//   title: "Cell Structure & Organelles Revision",
//   folderPath: "Biology / Cell Biology",
//   completedDate: "Today, 14:22",
//   initialScorePercent: 83,
//   finalMasteryPercent: 100,
//   totalCards: 12,
//   firstRoundCorrect: 10,
//   mistakesReviewed: 2,
//   timeSpentLabel: "6m 45s",
// };

// export const MOCK_MASTERED_CARDS: MasteredCardItem[] = [
//   { id: "1", name: "Mitochondria", avgTime: "18s avg" },
//   { id: "2", name: "Ribosome", avgTime: "14s avg" },
//   { id: "3", name: "Golgi Apparatus", avgTime: "29s avg" },
//   { id: "4", name: "Lysosome", avgTime: "21s avg" },
// ];

// export const MOCK_REVIEW_CARDS: ReviewCardItem[] = [
//   {
//     id: "1",
//     name: "Peroxisome",
//     cardLabel: "Flashcard #04",
//     userAnswer: "Degrades cellular waste and recycles debris.",
//     correctAnswer:
//       "Breaks down fatty acids through beta-oxidation and produces hydrogen peroxide (H2O2), neutralized by catalase.",
//   },
//   {
//     id: "2",
//     name: "Rough vs Smooth Endoplasmic Reticulum",
//     cardLabel: "Flashcard #09",
//     userAnswer: "Rough ER handles protein transport, Smooth ER handles cell shape and structural framing.",
//     correctAnswer:
//       "Rough ER synthesizes and folds proteins (studded with ribosomes). Smooth ER conducts lipid synthesis, steroid metabolism, and calcium storage.",
//   },
// ];


export const MOCK_FOLDER_DETAILS: FolderDetail[] = [
  {
    id: "1",
    name: "Biology & Medicine",
    badge: "BIO-MED",
    deckCount: 18,
    cardCount: 240,
    progressPercent: 72,
    colorTheme: "green",
    subFolders: [
      { id: "1a", name: "Cell Biology", sessionCount: 5 },
      { id: "1b", name: "Genetics", sessionCount: 3 },
      { id: "1c", name: "Bioenergetics", sessionCount: 4 },
    ],
  },
  {
    id: "2",
    name: "Cognitive Neuroscience",
    badge: "NEURO",
    deckCount: 9,
    cardCount: 114,
    progressPercent: 45,
    colorTheme: "purple",
    subFolders: [
      { id: "2a", name: "Synaptic Plasticity", sessionCount: 2 },
      { id: "2b", name: "Neural Circuits", sessionCount: 3 },
    ],
  },
  {
    id: "3",
    name: "Organic Chemistry",
    badge: "CHEM",
    deckCount: 14,
    cardCount: 192,
    progressPercent: 30,
    colorTheme: "orange",
    subFolders: [
      { id: "3a", name: "Reaction Mechanisms", sessionCount: 6 },
      { id: "3b", name: "Stereochemistry", sessionCount: 4 },
    ],
  },
  {
    id: "4",
    name: "Microeconomics",
    badge: "ECON",
    deckCount: 6,
    cardCount: 85,
    progressPercent: 55,
    colorTheme: "blue",
    subFolders: [{ id: "4a", name: "Market Equilibrium", sessionCount: 3 }],
  },
];


export const MOCK_LIBRARY_SESSIONS: LibrarySession[] = [
  {
    id: "1",
    subject: "Biology",
    folderName: "Bioenergetics",
    title: "Cellular Respiration & Krebs Cycle",
    score: 92,
    cardCount: 18,
    lastStudied: "2 hours ago",
    status: "mastered",
  },
  {
    id: "2",
    subject: "Neuroscience",
    folderName: "Synaptic Plasticity",
    title: "Synaptic Plasticity & LTP",
    score: 78,
    cardCount: 24,
    lastStudied: "Yesterday",
    status: "resume",
  },
  {
    id: "3",
    subject: "Chemistry",
    folderName: "Reaction Mechanisms",
    title: "Enzyme Kinetics & Michaelis-Menten",
    score: 85,
    cardCount: 15,
    lastStudied: "3 days ago",
    status: "review",
  },
  {
    id: "4",
    subject: "Biology",
    folderName: "Cell Biology",
    title: "Cell Structure & Organelles Revision",
    score: 100,
    cardCount: 12,
    lastStudied: "5 days ago",
    status: "mastered",
  },
  {
    id: "5",
    subject: "Economics",
    folderName: "Market Equilibrium",
    title: "Supply & Demand Fundamentals",
    score: 88,
    cardCount: 10,
    lastStudied: "1 week ago",
    status: "mastered",
  },
];



export const MOCK_ANALYTICS_OVERVIEW: AnalyticsOverview = {
  totalCardsStudied: 631,
  overallAccuracy: 87,
  totalSessionsCompleted: 24,
  avgTimePerCard: "4.6s",
};

export const MOCK_SUBJECT_PERFORMANCE: SubjectPerformance[] = [
  { id: "1", subject: "Biology & Medicine", accuracyPercent: 92, cardsStudied: 240, colorTheme: "green" },
  { id: "2", subject: "Cognitive Neuroscience", accuracyPercent: 78, cardsStudied: 114, colorTheme: "purple" },
  { id: "3", subject: "Organic Chemistry", accuracyPercent: 81, cardsStudied: 192, colorTheme: "orange" },
  { id: "4", subject: "Microeconomics", accuracyPercent: 90, cardsStudied: 85, colorTheme: "blue" },
];

export const MOCK_WEEKLY_ACTIVITY: WeeklyActivity[] = [
  { day: "Mon", cardsStudied: 32 },
  { day: "Tue", cardsStudied: 45 },
  { day: "Wed", cardsStudied: 28 },
  { day: "Thu", cardsStudied: 60 },
  { day: "Fri", cardsStudied: 40 },
  { day: "Sat", cardsStudied: 55 },
  { day: "Sun", cardsStudied: 20 },
];