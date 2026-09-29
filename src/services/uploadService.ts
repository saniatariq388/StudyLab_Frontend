"use server";

import { cookies } from "next/headers";
import { refreshAccessToken } from "./refresh";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL!;

// FIX: yeh authFetch se alag hai kyunke image upload ke liye
// Content-Type: application/json set NAHI karna — FormData ke
// liye browser/Node ko khud "multipart/form-data; boundary=..."
// set karne dena zaroori hai, warna Strapi request parse nahi kar payega.
async function doUploadFetch(files: File[], token: string) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  return fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: {
      // Content-Type jaan-bujh kar nahi diya — fetch khud set karega
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

async function getValidToken(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get("token")?.value;
  if (existing) {
    return existing;
  }
  return refreshAccessToken();
}

// Strapi ka /api/upload endpoint ek array return karta hai,
// har entry mein uploaded file ki "id" hoti hai — wahi humein
// sourcePage.image field mein link karni hai
export async function uploadImages(files: File[]): Promise<number[]> {
  if (files.length === 0) return [];

  let token = await getValidToken();
  let res = await doUploadFetch(files, token);

  if (res.status === 401) {
    token = await refreshAccessToken();
    res = await doUploadFetch(files, token);
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error?.message || "Failed to upload images");
  }

  const uploaded = await res.json(); // array of { id, url, ... }
  return uploaded.map((f: any) => f.id);
}