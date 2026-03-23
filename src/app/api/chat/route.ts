import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { analyses } from "@/lib/analyses";

const MAX_MESSAGE_LENGTH = 2000;

const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim() || "";
const genAI = new GoogleGenerativeAI(apiKey);

function buildSystemPrompt(): string {
  const analysisLines = analyses
    .map((a) => {
      const verdict = a.verdict ?? "Ingen rekommendation";
      const target = a.target ? `, Riktkurs: ${a.target}` : "";
      return `- ${a.title} (${a.date}): ${verdict}${target} — /analyser/${a.slug}`;
    })
    .join("\n");

  return `Du är en analytisk AI-assistent på Börsanalys.se — en svensk sajt med djupgående aktieanalyser.

DITT UPPDRAG:
- Ge korta, faktabaserade svar om aktier, bolag och börsen
- Hänvisa till Börsanalys.se egna analyser när de är relevanta
- Besvara även generella börsfrågor: värdering (P/E, P/S, EV/EBITDA), diversifiering, makroekonomi, teknisk analys, fundamentalanalys och investeringsstrategier
- Håll alltid en analytisk, professionell ton — som en erfaren portföljförvaltare

BÖRSANALYS.SE AKTUELLA ANALYSER:
${analysisLines}

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
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ text: "Meddelandet saknas." }, { status: 400 });
    }

    const trimmed = message.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { text: `Meddelandet måste vara mellan 1 och ${MAX_MESSAGE_LENGTH} tecken.` },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json({ text: "AI-tjänsten är inte konfigurerad." }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: buildSystemPrompt(),
    });

    const result = await model.generateContent(trimmed);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error("Chat API error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { text: "Ett fel uppstod. Försök igen senare." },
      { status: 500 }
    );
  }
}
