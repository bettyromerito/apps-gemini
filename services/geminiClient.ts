import { GoogleGenAI } from "@google/genai";

// ADVERTENCIA: Este es un archivo del lado del cliente.
// Tu API_KEY será visible en el código que se ejecuta en el navegador.
// NO se recomienda para aplicaciones en producción, ya que cualquiera podría usar tu clave.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  // Este error es para el desarrollador, para recordarle que configure la clave de API.
  // No evita que la clave sea expuesta si está presente.
  throw new Error("La variable de entorno API_KEY no está configurada. Por favor, añádela a tu entorno de desarrollo.");
}

export const ai = new GoogleGenAI({ apiKey });
