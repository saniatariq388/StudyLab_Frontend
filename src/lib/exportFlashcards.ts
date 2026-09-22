import { getFlashcardsForExport } from "../services/exportService";

export async function exportSessionFlashcards(sessionId: string, sessionName: string) {
  const cards = await getFlashcardsForExport(sessionId);

  let content = `# ${sessionName}\n\n`;
  cards.forEach((card, i) => {
    content += `${i + 1}. ${card.keyword}\n   Answer: ${card.answer}\n`;
    if (card.explanation) content += `   Note: ${card.explanation}\n`;
    content += `\n`;
  });

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sessionName.replace(/\s+/g, "_")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}