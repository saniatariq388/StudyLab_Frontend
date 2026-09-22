 "use server";
import { serverFetch } from "./serverFetch";
import { authFetch } from "./authFetch";

export interface UserFolder {
  id: string;
  name: string;
}

export interface FolderSession {
  id: string;
  name: string;
  totalCards: number;
  sessionStatus: string;
  createdAt: string;
}

// READ (used during page render) → serverFetch
export async function getUserFolders(): Promise<UserFolder[]> {
  const json = await serverFetch("/api/study-folders");
  return (json.data || []).map((f: any) => ({ id: f.documentId, name: f.name }));
}

export async function getSessionsInFolder(folderId: string): Promise<FolderSession[]> {
  const json = await serverFetch(`/api/study-sessions?filters[folder][documentId]=${folderId}`);
  return (json.data || []).map((s: any) => ({
    id: s.documentId,
    name: s.name,
    totalCards: s.totalCards,
    sessionStatus: s.sessionStatus,
    createdAt: s.createdAt,
  }));
}

// WRITE (triggered by button clicks) → authFetch, marked as Server Actions
export async function createFolder(name: string): Promise<UserFolder> {
 
  const json = await authFetch("/api/study-folders", {
    method: "POST",
    body: JSON.stringify({ data: { name } }),
  });
  return { id: json.data.documentId, name: json.data.name };
}

export async function deleteFolder(folderId: string) {
 
  return authFetch(`/api/study-folders/${folderId}`, { method: "DELETE" });
}

export async function deleteSession(sessionId: string) {
 
  return authFetch(`/api/study-sessions/${sessionId}`, { method: "DELETE" });
}

export async function attachSessionToFolder(sessionId: string, folderId: string) {
  
  return authFetch(`/api/study-sessions/${sessionId}`, {
    method: "PUT",
    body: JSON.stringify({ data: { folder: folderId } }),
  });
}