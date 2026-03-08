import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET || "borsanalys-default-session-secret";

function generateToken(): string {
  if (!ADMIN_PASSWORD) return "";
  return createHmac("sha256", SESSION_SECRET).update(ADMIN_PASSWORD).digest("hex");
}

export async function POST(request: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin-lösenord ej konfigurerat på servern." },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const password = body.password?.trim();

  if (!password || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Fel lösenord." }, { status: 401 });
  }

  const token = generateToken();
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
