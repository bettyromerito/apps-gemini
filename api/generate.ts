// Este archivo se ejecuta en el servidor, no en el navegador del usuario.
// Aquí es donde es SEGURO usar tu clave de API.
import { GoogleGenAI, Modality } from "@google/genai";

// La clave se leerá de una "variable de entorno" que configurarás en tu hosting.
// NUNCA escribas la clave directamente aquí en un proyecto real.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // Esta comprobación es importante.
  // Si la clave no está configurada en el hosting, la función fallará con un error claro.
  throw new Error("La variable de entorno API_KEY no está configurada.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Esta es la función que se ejecutará cuando tu app llame a "/api/generate"
// Vercel y Netlify convierten automáticamente este archivo en un endpoint de API.
export default async function handler(req: Request) {
  // Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { originalImageBase64, mimeType, prompt } = await req.json();

    if (!originalImageBase64 || !mimeType || !prompt) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros requeridos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Llamada segura a Gemini desde el servidor
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data: originalImageBase64, mimeType: mimeType } },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Extraemos la imagen de la respuesta de Gemini
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const newMediaUrl = `data:image/png;base64,${base64ImageBytes}`;
        
        // Devolvemos la imagen al frontend
        return new Response(JSON.stringify({ newMediaUrl }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    
    // Si no se encontró ninguna imagen en la respuesta
    throw new Error("La API de Gemini no devolvió una imagen.");

  } catch (error) {
    console.error('Error en la función de API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(JSON.stringify({ error: 'Error interno del servidor.', details: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}
