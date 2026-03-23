import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createRateLimiter } from "@/lib/rate-limit";

const checkRateLimit = createRateLimiter({ limit: 10, windowSeconds: 60 });

function isAuthenticated(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;
  const sessionCookie = request.cookies.get("admin_session")?.value;

  if (!adminPassword || !sessionSecret || !sessionCookie) return false;

  const expected = createHmac("sha256", sessionSecret).update(adminPassword).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sessionCookie), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Ej autentiserad." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
