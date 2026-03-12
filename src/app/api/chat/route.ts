import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Vi rensar nyckeln från eventuella dolda mellanslag
const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!apiKey) {
      console.error("API-nyckel saknas helt i Vercel!");
      return NextResponse.json({ text: "Systemfel: API-nyckel saknas." }, { status: 500 });
    }

    // Vi använder 'gemini-1.5-flash-latest' som är mest tolerant mot versionsfel
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Du är en intelligent AI-assistent på Börsanalys.se. Svara på svenska. Fråga: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    // Här loggar vi exakt vad Google säger så du kan se det i Vercel-loggen
    console.error("DETALJERAT FEL:", error.message);
    return NextResponse.json({ text: "AI:n sover just nu, försök igen om en liten stund!" }, { status: 500 });
  }
}
