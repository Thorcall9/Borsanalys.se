import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return (
    origin === "https://borsanalys.se" ||
    origin === "https://www.borsanalys.se" ||
    origin.endsWith(".vercel.app") ||
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

  const isNewsletter = !name && !message;

  if (!isNewsletter) {
    if (name && name.length > MAX_NAME_LENGTH) return NextResponse.json({ error: "Namnet är för långt." }, { status: 400 });
    if (message && message.length > MAX_MESSAGE_LENGTH) return NextResponse.json({ error: "Meddelandet är för långt." }, { status: 400 });
  }

  // SPARA I NEON
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
      console.log("NY PRENUMERANT SPARAD:", email);
    } catch (err) {
      console.error("Neon-fel:", err);
    }
  } else {
    console.log("KONTAKTMEDDELANDE:", { name, email, message });
  }

  const redirectUrl = isNewsletter ? "/?prenumeration=klar" : "/kontakt?skickat=true";
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}
