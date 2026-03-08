import { NextRequest, NextResponse } from "next/server";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGIN = "https://borsanalys.se";

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Allow non-browser requests (e.g., curl)
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

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Alla fält är obligatoriska." },
      { status: 400 }
    );
  }

  if (name.length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      { error: "Namnet är för långt." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json(
      { error: "Ogiltig e-postadress." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Meddelandet är för långt (max 5000 tecken)." },
      { status: 400 }
    );
  }

  // TODO: Send email or store in database
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.redirect(
    new URL("/kontakt?skickat=true", request.url),
    303
  );
}
