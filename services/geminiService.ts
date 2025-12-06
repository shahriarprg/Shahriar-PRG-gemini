// services/geminiService.ts
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { API_KEY_ERROR_MESSAGE } from '../constants';

const GEMINI_MODEL = 'gemini-2.5-flash-image';

export const generateImageWithPrompt = async (
  base64Image: string,
  mimeType: string,
  prompt: string,
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error(API_KEY_ERROR_MESSAGE);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = {
    inlineData: {
      mimeType: mimeType,
      data: base64Image,
    },
  };
  const textPart = {
    text: prompt,
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: { parts: [imagePart, textPart] },
  });

  const generatedImagePart = response.candidates?.[0]?.content?.parts.find(
    (part) => part.inlineData && part.inlineData.mimeType.startsWith('image/'),
  );

  if (generatedImagePart?.inlineData?.data) {
    return `data:${generatedImagePart.inlineData.mimeType};base64,${generatedImagePart.inlineData.data}`;
  } else if (response.text) {
    // If no image part found but text is present, return it as a string.
    // This might indicate the model couldn't generate an image for some reason.
    throw new Error(`AI returned text instead of an image: ${response.text}`);
  } else {
    throw new Error('No image or text content received from the AI.');
  }
};
