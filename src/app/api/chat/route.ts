import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const MAX_MESSAGE_LENGTH = 2000;

const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
if (!apiKey) {
  console.error("GOOGLE_GEMINI_API_KEY environment variable is not set");
}

const SYSTEM_PROMPT = `Du är en analytisk AI-assistent på Börsanalys.se — en svensk sajt med djupgående aktieanalyser.

DITT UPPDRAG:
- Ge korta, faktabaserade svar om aktier, bolag och börsen
- Hänvisa till Börsanalys.se egna analyser när de är relevanta (NVIDIA, Microsoft, Alphabet)
- Håll alltid en analytisk, professionell ton — som en erfaren portföljförvaltare

BÖRSANALYS.SE AKTUELLA ANALYSER OCH RIKTKURSER:
- NVIDIA (NVDA): Riktkurs $185, rekommendation KÖP
- Microsoft (MSFT): Riktkurs $510, rekommendation KÖP
- Alphabet (GOOGL): Riktkurs $360, rekommendation KÖP

SVARSFORMAT:
- Håll svar korta och koncisa — max 150 ord om inte användaren ber om mer
- Använd inga onödiga punktlistor — skriv i löpande text
- Avsluta alltid med en tydlig slutsats eller rekommendation
- Skriv alltid på svenska om inte användaren skriver på annat språk
- Inkludera alltid denna disclaimer i slutet av varje svar: "⚠️ Detta är inte finansiell rådgivning. Gör alltid din egen analys."

VIKTIGT:
- Spekulera inte om riktkurser för bolag som Börsanalys.se inte analyserat
- Om du inte vet något med säkerhet — säg det
- Hänvisa gärna till borsanalys.se/analyser för djupare läsning`;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { text: "AI-tjänsten är inte konfigurerad. Försök igen senare." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { text: "Meddelandet får inte vara tomt." },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { text: `Meddelandet är för långt. Max ${MAX_MESSAGE_LENGTH} tecken.` },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(message.trim());
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { text: "Ett fel uppstod. Försök igen senare." },
      { status: 500 }
    );
  }
}
