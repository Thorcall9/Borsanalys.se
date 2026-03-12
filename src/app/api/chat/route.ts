import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();

// Här tvingar vi in API-versionen "v1"
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ text: "API-nyckel saknas." }, { status: 500 });
    }

    // Vi testar att köra utan "models/" prefixet men med en specifik metod
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    }, { apiVersion: 'v1' }); // TVINGA V1 ISTÄLLET FÖR BETA

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("DETALJERAT FEL:", error.message);
    return NextResponse.json({ text: "Nu blev det ett tekniskt fel. Prova igen!" }, { status: 500 });
  }
}
