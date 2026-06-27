import { dbConnect } from "@/app/lib/dbConnect";
import SettingModel from "@/app/models/settings.models";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ ownerId: string }> },
) {
  try {
    const { message } = await req.json();
    const { ownerId } = await params;

    console.log({ message, ownerId });
    if (!ownerId) {
      return NextResponse.json(
        {
          message: "Owner's Id is not provided",
          success: false,
        },
        { status: 400 },
      );
    }

    await dbConnect();
    const settings = await SettingModel.findOne({ ownerId });
    if (!settings) {
      return NextResponse.json(
        {
          message: "Chatbot is not configured for this business.",
          success: false,
        },
        { status: 404 },
      );
    }

    const knowledge = `
        Business name: ${settings.businessName} || not provided,
        support email: ${settings.supportEmail} || not provided,
        knowledge: ${settings.knowledge} || not provided
         `;

    const prompt = `
You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarize, or interpret the information if needed.
Do NOT invent new policies, prices, or promises.
If the customer's question is completely unrelated to the information,
or cannot be reasonably answered from it, reply exactly with:
"Please contact support."

-------------------
BUSINESS INFORMATION
-------------------
${knowledge}

-------------------
CUSTOMER QUESTION
-------------------
${message}

-------------------
ANSWER
-------------------
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(response.text);
    const res = NextResponse.json(response.text);

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return res;
  } catch (error) {
    console.log(error);

    const response = NextResponse.json(
      {
        message: "An unexpected error occured",
        success: false,
      },
      { status: 500 },
    );

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  }
}

export const OPTIONS = async () => {
  return NextResponse.json(null, {
    status: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
