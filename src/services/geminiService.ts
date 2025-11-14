import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Generates an image from a text prompt using the Gemini API.
 * @param prompt The text to generate the image from.
 * @returns A base64 data URL string or null if it fails.
 */
export const generateImage = async (prompt: string): Promise<string | null> => {
  if (!prompt || prompt.trim() === '') {
    console.warn("Attempted to generate an image with an empty prompt.");
    return null;
  }
  
  // FIX: Per coding guidelines, the API key is retrieved from `process.env.API_KEY`
  // and it is assumed to be pre-configured and valid.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const firstCandidate = response.candidates?.[0];
    const inlineDataPart = firstCandidate?.content?.parts?.find(part => part.inlineData);
    
    if (inlineDataPart?.inlineData) {
        const base64ImageBytes: string = inlineDataPart.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
    }

    console.warn("No image data found in Gemini response.", response);
    throw new Error("La API no devolvió datos de imagen válidos.");
  } catch (error) {
    console.error("Detailed error while generating image with Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid') || error.message.includes('permission')) {
             throw new Error("La clave de API no es válida o no tiene los permisos necesarios.");
        }
        if (error.message.includes('429')) { // Too many requests
             throw new Error("Demasiadas solicitudes. Por favor, espera un momento.");
        }
        if (error.message.toLowerCase().includes('entity was not found') || error.message.toLowerCase().includes('api key not found')) {
            // FIX: Updated error message to be more generic since we assume the key is present.
            throw new Error("Clave de API no encontrada o incorrecta. Verifica tu variable de entorno API_KEY.");
        }
        throw new Error(`Error de la API de Gemini: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al contactar la API de Gemini.");
  }
};
