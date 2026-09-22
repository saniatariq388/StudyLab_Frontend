"use server";

import { cookies } from "next/headers";
import { refreshAccessToken } from "./refresh";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL!;


//dofetch = Isko alag function banane ki wajah: hum isse do baar call karenge (neeche dekhogi) — ek baar normal, aur agar 401 aaye to dobara naye token ke saath.

async function doFetch(path: string, options: RequestInit, token: string) {
  return fetch(`${STRAPI_URL}${path}`, {
    ...options, //options (method, body, wagera)
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

export async function authFetch(path: string, options: RequestInit = {}) {
  let token = await getValidToken();

  let res = await doFetch(path, options, token);

  if (res.status === 401) {
    token = await refreshAccessToken();
    res = await doFetch(path, options, token);
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.error?.message || "Missing or invalid credentials");
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

















//----------------------------------
// typescript TypeScript type hai jo browser/Node ke fetch() API ke saath aata hai.

// options requestInit

// fetch(url, {
//   method: "POST",       // GET, POST, PUT, DELETE, wagera
//   headers: { ... },      // custom headers
//   body: "...",           // request body
//   credentials: "include", // cookies bhejni hain ya nahi
//   // ... aur bhi kai optional fields
// })


// Ye SIRF DELETE karega
// authFetch(`/api/study-folders/${id}`, {
//   method: "DELETE",
// });

// // Ye SIRF PUT karega (alag call, alag jagah code mein)
// authFetch(`/api/study-sessions/${id}`, {
//   method: "PUT",
//   body: JSON.stringify({ data: { folder: folderId } }),
// });