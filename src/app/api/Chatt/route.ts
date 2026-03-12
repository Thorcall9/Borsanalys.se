import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Vi hämtar nyckeln som du precis sparade i Vercel
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Vi använder "flash"-modellen för att den är snabbast och gratis
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Du är en intelligent AI-assistent på hemsidan Börsanalys.se. 
    Ditt jobb är att hjälpa besökare med frågor om aktieanalyser, börsen och finansiella nycklar. 
    Svara professionellt, objektivt och på svenska. 
    Här är frågan från besökaren: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Kunde inte hämta svar" }, { status: 500 });
  }
}
