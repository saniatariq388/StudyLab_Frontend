export const PASTEL_THEMES = [
  { bg: "bg-rose-50", border: "border-rose-100", badge: "bg-rose-100 text-rose-700", accent: "text-rose-500" },
  { bg: "bg-amber-50", border: "border-amber-100", badge: "bg-amber-100 text-amber-700", accent: "text-amber-500" },
  { bg: "bg-emerald-50", border: "border-emerald-100", badge: "bg-emerald-100 text-emerald-700", accent: "text-emerald-500" },
  { bg: "bg-sky-50", border: "border-sky-100", badge: "bg-sky-100 text-sky-700", accent: "text-sky-500" },
  { bg: "bg-violet-50", border: "border-violet-100", badge: "bg-violet-100 text-violet-700", accent: "text-violet-500" },
  { bg: "bg-orange-50", border: "border-orange-100", badge: "bg-orange-100 text-orange-700", accent: "text-orange-500" },
  { bg: "bg-teal-50", border: "border-teal-100", badge: "bg-teal-100 text-teal-700", accent: "text-teal-500" },
  { bg: "bg-fuchsia-50", border: "border-fuchsia-100", badge: "bg-fuchsia-100 text-fuchsia-700", accent: "text-fuchsia-500" },
];

// Consistent color per card — same card ID always gets same color (no flicker on re-render)
export function getCardTheme(cardId: string) {
  let hash = 0;
  for (let i = 0; i < cardId.length; i++) {
    hash = cardId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PASTEL_THEMES.length;
  return PASTEL_THEMES[index];
}