import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, IndianLanguage, CareerRecommendation, SkillSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-3-flash-preview";

export const generateCareerRecommendations = async (
  profile: UserProfile,
  language: IndianLanguage
): Promise<CareerRecommendation[]> => {
  const prompt = `
    Analyze the following student profile and suggest 5 suitable career paths.
    
    Context:
    - Name: ${profile.name}
    - Education: ${profile.educationLevel}
    - Interests: ${profile.interests.join(", ")}
    - Skills: ${profile.skills.join(", ")}
    - Preferred Location: ${profile.preferredLocation || "Anywhere in India"}
    - Language: Output strictly in ${language} language.
    - Financials: Salary must be in Indian Rupees (INR) per annum (e.g., ₹5,00,000 - ₹12,00,000).
    
    Requirements:
    - Provide a "marketOutlook" describing the demand in India for the next 5 years.
    - Provide a "matchScore" (0-100) based on skills/interests.
    - Provide "requiredSkills" that they might lack but need.
    
    Output strictly valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              salaryRange: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              reason: { type: Type.STRING },
              marketOutlook: { type: Type.STRING },
              requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["id", "title", "description", "salaryRange", "matchScore", "reason", "marketOutlook", "requiredSkills"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const getSkillSuggestions = async (
  careers: CareerRecommendation[],
  profile: UserProfile,
  language: IndianLanguage
): Promise<SkillSuggestion[]> => {
  if (careers.length === 0) return [];
  
  const careerTitles = careers.map(c => c.title).join(", ");
  const prompt = `
    Based on the target careers: [${careerTitles}] and the user's current skills: [${profile.skills.join(", ")}],
    suggest 4 high-impact skills they should learn immediately to improve employability in India.
    Language: ${language}.
    Provide list of generic resources/topics to study.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              reason: { type: Type.STRING },
              resources: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const chatWithMentor = async (
  history: { role: 'user' | 'model'; text: string }[],
  message: string,
  profile: UserProfile,
  language: IndianLanguage
) => {
  const systemInstruction = `You are a supportive, intelligent career mentor named 'PathWeaver Bot'. 
  User Context: ${JSON.stringify(profile)}.
  Language: Reply in ${language}.
  Style: Encouraging, concise, and culturally relevant to India.`;

  try {
    // Transform history to Gemini format
    const contents = history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
    }));
    
    // Add new message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
      config: { systemInstruction }
    });

    return response.text || "I am thinking...";
  } catch (e) {
    return "I'm having trouble connecting right now. Please try again.";
  }
};
