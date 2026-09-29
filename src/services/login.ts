"use server";

import { cookies } from "next/headers";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL!;

// Keep these in sync with studylab-backend/config/plugins.ts
const ACCESS_TOKEN_MAXAGE = 600;        // 10 min — accessTokenLifespan
const REFRESH_TOKEN_MAXAGE = 1209600;   // 14 days — idleRefreshTokenLifespan

export interface LoginPayload {
  email: string;
  password: string;
}

export async function loginUser(payload: LoginPayload) {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: payload.email,
      password: payload.password,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    // FIX: asal Strapi error ab console mein bhi dikhega, taake future mein
    // generic message ke piche chupi wajah pata chal sake
    console.error("Strapi login error:", res.status, errorBody);
    throw new Error(errorBody?.error?.message || "Invalid email or password");
  }

  const result = await res.json();

  // FIX: yeh check add kiya — agar Strapi 200 return kare lekin jwt
  // kisi wajah se missing/undefined ho, to pehle hi clear error throw ho,
  // taake cookies().set() ko undefined value milne se generic crash na ho
  if (!result?.jwt) {
    console.error("Login succeeded but no jwt in response:", result);
    throw new Error("Login response invalid — no token received");
  }

  // FIX: poore cookie-setting hisse ko try/catch mein wrap kiya,
  // kyunke pehle yahan koi try/catch nahi tha — agar yeh crash karta
  // to uncaught exception "Internal Server Error" ban jata (wahi bug jo abhi ho raha tha)
  try {
    const cookieStore = await cookies();

    cookieStore.set("token", result.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAXAGE,
    });

    // FIX: refreshToken ab response BODY se bhi le rahe hain (jaisa register
    // ke curl test mein dikha tha: { jwt, refreshToken, user }), na ke sirf
    // Set-Cookie header se. Purana code sirf header parse karta tha, jo shayad
    // is Strapi setup mein set hi nahi ho raha, isliye refresh cookie kabhi
    // banta hi nahi tha (silent fail, koi crash nahi lekin refresh kaam nahi karta)
    if (result.refreshToken) {
      cookieStore.set("strapi_up_refresh", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: REFRESH_TOKEN_MAXAGE,
      });
    } else {
      // Purana Set-Cookie header wala fallback bhi rakha hai, sirf case mein
      // Strapi kabhi header se bhi refresh token bheje
      const setCookieHeaders = res.headers.getSetCookie?.() ?? [];
      const refreshCookieRaw = setCookieHeaders.find((c) =>
        c.startsWith("strapi_up_refresh=")
      );
      if (refreshCookieRaw) {
        const refreshValue = refreshCookieRaw.split(";")[0].split("=")[1];
        cookieStore.set("strapi_up_refresh", refreshValue, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: REFRESH_TOKEN_MAXAGE,
        });
      }
    }
  } catch (cookieErr) {
    // FIX: ab crash silent/generic nahi hoga — asal wajah console mein
    // print hogi aur user ko readable error milega
    console.error("Cookie set error during login:", cookieErr);
    throw new Error("Could not create session, please try again");
  }

  return result;
}