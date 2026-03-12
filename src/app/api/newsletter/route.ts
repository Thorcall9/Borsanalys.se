import { NextRequest, NextResponse } from "next/server";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// VIKTIGT: Här är den ENDA versionen av funktionen som ska finnas:
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
  // Här anropas funktionen
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

  // Om detta är ett nyhetsbrev, kanske vi bara har email? 
  // Om koden kräver alla tre kommer den ge fel om man bara fyller i e-post.
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Alla fält (namn, e-post, meddelande) är obligatoriska." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json({ error: "Ogiltig e-postadress." }, { status: 400 });
  }

  // Logga resultatet (syns i Vercel-loggarna)
  console.log("Formulär skickat:", { name, email, message });

  // Skicka användaren till en tacksida
  return NextResponse.redirect(
    new URL("/kontakt?skickat=true", request.url),
    303
  );
}
