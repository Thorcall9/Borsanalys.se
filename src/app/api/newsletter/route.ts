import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return (
    origin === "https://borsanalys.se" ||
    origin === "https://www.borsanalys.se" ||
    origin.startsWith("http://localhost")
  );
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

  const hasName = name !== undefined && name !== null && name.length > 0;
  const hasMessage = message !== undefined && message !== null && message.length > 0;
  const isNewsletter = !hasName && !hasMessage;

  if (!isNewsletter) {
    if (hasName && name.length > MAX_NAME_LENGTH) return NextResponse.json({ error: "Namnet är för långt." }, { status: 400 });
    if (hasMessage && message.length > MAX_MESSAGE_LENGTH) return NextResponse.json({ error: "Meddelandet är för långt." }, { status: 400 });
  }

  if (isNewsletter) {
    try {
      const sql = neon(process.env.DATABASE_URL!);
      await sql`
        CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;
      await sql`
        INSERT INTO subscribers (email)
        VALUES (${email})
        ON CONFLICT (email) DO NOTHING
      `;
      console.log("New subscriber saved");
    } catch (err) {
      console.error("Database error during newsletter signup:", err);
      return NextResponse.json({ error: "Ett fel uppstod. Försök igen senare." }, { status: 500 });
    }
  } else {
    console.log("Contact message received from form submission");
  }

  const redirectUrl = isNewsletter ? "/?prenumeration=klar" : "/kontakt?skickat=true";
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}
