import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImageAngle = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64ImageData,
                        mimeType: mimeType,
                    },
                },
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            // The image editing model returns PNGs.
            return `data:image/png;base64,${base64ImageBytes}`;
        }
    }

    throw new Error('No image was generated in the API response.');
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    throw new Error('Failed to generate image angle.');
  }
};
