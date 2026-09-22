import { getAllSessions } from "@/src/services/libraryService";
import LibrarySearchable from "./LibrarySearchable";

export default async function LibraryRealContent() {
  const sessions = await getAllSessions();
  return <LibrarySearchable initialSessions={sessions} />;
}