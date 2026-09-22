import { getAuthToken } from "../lib/authToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = getAuthToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  return res.json();
}