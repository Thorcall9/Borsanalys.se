import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_ORIGINS = [
  "https://borsanalys.se",
  "https://www.borsanalys.se",
];

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow Vercel preview deployments for this specific project
  if (origin.endsWith("-thorcall9s-projects.vercel.app")) return true;
  if (process.env.NODE_ENV === "development" && origin.startsWith("http://localhost:")) return true;
  return false;
}

export async function POST(request: NextRequest) {
  if (!isValidOrigin(request)) {
    return NextResponse.json({ error: "Otillåten källa." }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }

  const email = formData.get("email")?.toString().trim();
  const name = formData.get("name")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!email || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json({ error: "En giltig e-postadress krävs." }, { status: 400 });
  }

  const isNewsletter = !name && !message;

  if (!isNewsletter) {
    if (name && name.length > MAX_NAME_LENGTH) return NextResponse.json({ error: "Namnet är för långt." }, { status: 400 });
    if (message && message.length > MAX_MESSAGE_LENGTH) return NextResponse.json({ error: "Meddelandet är för långt." }, { status: 400 });
  }

  if (isNewsletter) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      console.error("DATABASE_URL is not configured");
      return NextResponse.json({ error: "Serverkonfiguration saknas." }, { status: 500 });
    }

    try {
      const sql = neon(databaseUrl);
      await sql`
        INSERT INTO subscribers (email)
        VALUES (${email})
        ON CONFLICT (email) DO NOTHING
      `;
    } catch (err) {
      console.error("Database error during newsletter subscription");
      return NextResponse.json({ error: "Kunde inte spara prenumerationen." }, { status: 500 });
    }
  }

  const redirectUrl = isNewsletter ? "/?prenumeration=klar" : "/kontakt?skickat=true";
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}
