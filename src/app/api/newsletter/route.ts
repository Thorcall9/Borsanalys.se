import { NextRequest, NextResponse } from "next/server";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
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

  // VALIDERING
  if (!email || !EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json({ error: "En giltig e-postadress krävs." }, { status: 400 });
  }

  // Om namn och meddelande saknas antar vi att det är en nyhetsbrevsprenumeration
  const isNewsletter = !name && !message;

  if (!isNewsletter) {
    // Om det INTE är ett nyhetsbrev (dvs kontaktformulär), kolla längden på namn/meddelande
    if (name && name.length > MAX_NAME_LENGTH) return NextResponse.json({ error: "Namnet är för långt." }, { status: 400 });
    if (message && message.length > MAX_MESSAGE_LENGTH) return NextResponse.json({ error: "Meddelandet är för långt." }, { status: 400 });
  }

  // LOGGNING (Här ser du i Vercel vem som prenumererat)
  if (isNewsletter) {
    console.log("NY PRENUMERANT:", email);
  } else {
    console.log("KONTAKTMEDDELANDE:", { name, email, message });
  }

  // SKICKA TILLBAKA TILL HEMSIDAN
  // Vi skickar användaren till en tacksida eller tillbaka till startsidan med en glad gubbe
  const redirectUrl = isNewsletter ? "/?prenumeration=klar" : "/kontakt?skickat=true";
  
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}
