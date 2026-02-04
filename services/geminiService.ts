
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDailyInsight(entryText: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this diary entry: "${entryText}", provide one single, grounding, mature sentence of encouragement. 
                 Avoid toxic positivity and cliches. Use a calm, steady tone. No emojis.`,
      config: {
        maxOutputTokens: 60,
        temperature: 0.7,
      },
    });
    return response.text?.trim() || "You are enough, exactly as you are today.";
  } catch (error) {
    console.error("Gemini insight error:", error);
    return "Keep moving at your own pace.";
  }
}

export async function generateFreshPrompt() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a minimalist motivational line and a reflective prompt for a diary. Tone: calm, grounding, emotionally mature. Focus on self-trust and quiet growth.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            line: { type: Type.STRING },
            prompt: { type: Type.STRING }
          },
          required: ["line", "prompt"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return null;
  }
}
