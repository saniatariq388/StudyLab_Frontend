import { FolderDetail } from "../types/folders";
import { MOCK_FOLDER_DETAILS } from "../constant/mockData";

// TODO: Replace with real Strapi call to GET /api/study-folders?populate=deep
// once frontend auth is wired up (see study-folder controller — already
// owner-scoped on the backend).
export async function getFolderDetails(): Promise<FolderDetail[]> {
  return MOCK_FOLDER_DETAILS;
}