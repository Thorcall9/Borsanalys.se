import { NextRequest, NextResponse } from "next/server";

const MAX_EMAIL_LENGTH = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGIN = "https://borsanalys.se";

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === ALLOWED_ORIGIN || origin.startsWith("http://localhost");
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

  if (!email || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json(
      { error: "Ogiltig e-postadress." },
      { status: 400 }
    );
  }

  // TODO: Store subscriber or integrate with email service (Mailchimp, Resend, etc.)
  console.log("Newsletter subscription:", { email });

  return NextResponse.redirect(new URL("/", request.url), 303);
}
