
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const analyzeStrategy = async (prompt, contextData) => {
  if (!genAI) {
    return "Error: No se ha configurado la API Key de Gemini. Por favor, añádela en el archivo .env como VITE_GEMINI_API_KEY.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `
      Eres el Copiloto Estratégico de la UPS (Universidad Politécnica Salesiana). 
      Tu objetivo es analizar los datos del Plan Estratégico 2026 y proporcionar insights valiosos.
      
      MODOS DE OPERACIÓN:
      1. ASISTENTE DE EVIDENCIAS: Si el usuario menciona un documento o archivo, busca en el contexto la iniciativa cuya descripción o campo 'evidencia' coincida mejor. Sugiere la vinculación exacta.
      2. ANALISTA PREDICTIVO: Si se consulta sobre el futuro o tendencias, utiliza el progreso actual para proyectar el cumplimiento. Considera que estamos en Febrero 2026.
      3. CONSULTOR ESTRATÉGICO: Responde dudas sobre PESTEL, Porter o BCG basándote en los datos de la carrera.

      CONTEXTO DE LOS DATOS:
      ${JSON.stringify(contextData)}
      
      INSTRUCCIONES:
      1. Sé profesional pero motivador.
      2. Usa los datos reales proporcionados.
      3. Si un KPI está bajo (menos del 40%), relaciónalo con posibles causas y sugiere acciones tácticas.
      4. Responde siempre en español.
      5. Mantén las respuestas breves y directas (máximo 3 párrafos).
    `;

    const fullPrompt = `${systemInstruction}\n\nCONSULTA DEL USUARIO: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, tuve un problema al procesar tu solicitud con Gemini. Verifica tu conexión o la validez de la API Key.";
  }
};
