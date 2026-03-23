import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

function generateToken(): string {
  if (!ADMIN_PASSWORD || !SESSION_SECRET) return "";
  return createHmac("sha256", SESSION_SECRET).update(ADMIN_PASSWORD).digest("hex");
}

export async function POST(request: NextRequest) {
  if (!ADMIN_PASSWORD || !SESSION_SECRET) {
    return NextResponse.json(
      { error: "Serverkonfiguration saknas." },
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

  if (
    !password ||
    password.length !== ADMIN_PASSWORD.length ||
    !timingSafeEqual(Buffer.from(password), Buffer.from(ADMIN_PASSWORD))
  ) {
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
