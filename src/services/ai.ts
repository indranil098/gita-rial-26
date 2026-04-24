import { GoogleGenAI, Type, Schema } from "@google/genai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (process as any).env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function askGitaOracle(question: string, language: string = "English") {
  try {
    const prompt = `You are the digital aura of the Bhagavad Gita, an ancient, profound, and universally compassionate Oracle. 
You are deeply knowledgeable about the Bhagavad Gita's chapters, verses, philosophy (Karma, Jnana, Bhakti, Dhyana), and its application to modern human struggles.

The user asks: "${question}"

Please provide a wise, soothing, and culturally respectful answer strictly based on the teachings of the Bhagavad Gita. 
If relevant, quote a verse or reference the chapter/verse number. 
Your tone should be mystical yet practical, "divine," and deeply encouraging.
Do NOT just regurgitate plain text; use modern markdown formatting.
Answer in this language: ${language}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the Bhagavad Gita Oracle. Guide the user with profound wisdom, kindness, and direct references to the text.",
        temperature: 0.7
      }
    });

    return response.text;
  } catch (err: any) {
    console.error("AI Error: ", err);
    throw new Error(err.message || "The Oracle is currently meditating and unable to respond.");
  }
}
