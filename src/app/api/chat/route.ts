import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim() || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Vi använder "models/gemini-1.5-flash" (vissa system kräver "models/" prefixet)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("DETALJERAT FEL:", error.message);
    // Om det fortfarande blir 404, skriver vi ut en ledtråd
    return NextResponse.json({ text: `Fel: ${error.message}` }, { status: 500 });
  }
}
