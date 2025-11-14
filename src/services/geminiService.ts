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
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not configured. Please select an API key to continue.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

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
    return null;
  } catch (error) {
    console.error("Detailed error while generating image with Gemini:", error);
    if (error instanceof Error) {
        // This specific error message indicates a problem with the API key.
        // Propagate it so the UI can prompt the user to select a new one.
        if (error.message.includes('API key not valid') || error.message.includes('Requested entity was not found')) {
             throw new Error("Requested entity was not found. Please re-select your API Key.");
        }
        throw new Error(`The Gemini API returned an error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
};
