export enum EducationLevel {
  SCHOOL = "School (Class 1-10)",
  HIGH_SCHOOL = "High School (Class 11-12)",
  UNDERGRADUATE = "Undergraduate",
  GRADUATE = "Graduate",
  POST_GRADUATION = "Post Graduation",
  POST_DOC = "Post Doc",
}

export enum IndianLanguage {
  ENGLISH = "English",
  HINDI = "Hindi",
  BENGALI = "Bengali",
  TELUGU = "Telugu",
  MARATHI = "Marathi",
  TAMIL = "Tamil",
  URDU = "Urdu",
  GUJARATI = "Gujarati",
  KANNADA = "Kannada",
  MALAYALAM = "Malayalam",
  ODIA = "Odia",
  PUNJABI = "Punjabi",
  ASSAMESE = "Assamese",
}

export interface UserProfile {
  name: string;
  educationLevel: EducationLevel;
  interests: string[];
  skills: string[];
  preferredLocation: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  salaryRange: string; // INR
  matchScore: number;
  reason: string;
  marketOutlook: string;
  requiredSkills: string[];
}

export interface SkillSuggestion {
  skill: string;
  reason: string;
  resources: string[]; // List of mock resources/topics
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Quote {
  text: string;
  author: string;
}
