import { IndianLanguage, Quote, EducationLevel } from './types';

export const LANGUAGES = Object.values(IndianLanguage);

export const EDUCATION_LEVELS = Object.values(EducationLevel);

export const MOTIVATIONAL_QUOTES: Quote[] = [
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
  { text: "You have to dream before your dreams can come true.", author: "A.P.J. Abdul Kalam" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

const BASE_TRANSLATIONS = {
  welcome: "Welcome to PathWeaver",
  subtitle: "AI-Powered Career Navigator",
  profile: "My Profile",
  recommendations: "Career Paths",
  skills: "Skill Up",
  chat: "AI Mentor",
  submit: "Analyze Career",
  loading: "AI is analyzing your future...",
  share: "Share",
  marketOutlook: "Market Outlook",
  salary: "Salary (INR)",
  match: "Match",
  fullName: "Full Name",
  educationLevel: "Education Level",
  preferredLocation: "Preferred Location (City/State)",
  interests: "Interests",
  enterName: "Enter your name",
  locationPlaceholder: "e.g. Bangalore, Mumbai, Remote",
  interestPlaceholder: "e.g. Coding, Design, Space",
  skillPlaceholder: "e.g. Python, Public Speaking",
  chatPlaceholder: "Ask about careers, courses, or advice...",
  filterPlaceholder: "Filter by title...",
  learnSkills: "Learn Skills",
  skillsGap: "SKILLS GAP:",
  recommendedResources: "Recommended Topics/Resources",
  findingResources: "Finding learning resources...",
  generateFirst: "Generate career recommendations first to see skill paths!"
};

export const UI_TRANSLATIONS: Record<string, typeof BASE_TRANSLATIONS> = {
  [IndianLanguage.ENGLISH]: BASE_TRANSLATIONS,
  [IndianLanguage.HINDI]: {
    ...BASE_TRANSLATIONS,
    welcome: "पाथवीवर में आपका स्वागत है",
    subtitle: "एआई-संचालित करियर नेविगेटर",
    profile: "मेरी प्रोफाइल",
    recommendations: "करियर सुझाव",
    skills: "कौशल विकास",
    chat: "एआई मेंटर",
    submit: "करियर विश्लेषण करें",
    loading: "एआई विश्लेषण कर रहा है...",
    share: "साझा करें",
    marketOutlook: "बाजार दृष्टिकोण",
    salary: "वेतन (INR)",
    match: "मेल",
    fullName: "पूरा नाम",
    educationLevel: "शिक्षा स्तर",
    preferredLocation: "पसंदीदा स्थान",
    interests: "रुचियां",
    enterName: "अपना नाम दर्ज करें",
    locationPlaceholder: "जैसे बैंगलोर, मुंबई",
    interestPlaceholder: "जैसे कोडिंग, क्रिकेट",
    skillPlaceholder: "जैसे पायथन, अंग्रेजी",
    chatPlaceholder: "करियर या कोर्स के बारे में पूछें...",
    filterPlaceholder: "शीर्षक से खोजें...",
    learnSkills: "कौशल सीखें",
    skillsGap: "कौशल अंतराल:",
    recommendedResources: "अनुशंसित संसाधन",
    findingResources: "संसाधन खोज रहे हैं...",
    generateFirst: "कौशल देखने के लिए पहले करियर विश्लेषण करें!"
  },
  [IndianLanguage.BENGALI]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver-এ স্বাগতম",
    profile: "আমার প্রোফাইল",
    recommendations: "ক্যারিয়ার পাথ",
    skills: "দক্ষতা বৃদ্ধি",
    chat: "এআই মেন্টর",
    submit: "বিশ্লেষণ করুন",
    loading: "বিশ্লেষণ করা হচ্ছে...",
    fullName: "সম্পূর্ণ নাম",
    educationLevel: "শিক্ষাগত যোগ্যতা",
    preferredLocation: "পছন্দের জায়গা",
    interests: "আগ্রহ",
    enterName: "আপনার নাম লিখুন",
    locationPlaceholder: "যেমন কলকাতা, ঢাকা",
    chatPlaceholder: "ক্যারিয়ার সম্পর্কে জিজ্ঞাসা করুন...",
    learnSkills: "দক্ষতা শিখুন"
  },
  [IndianLanguage.TELUGU]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaverకి స్వాగతం",
    profile: "నా ప్రొఫైల్",
    recommendations: "కారియర్ మార్గాలు",
    skills: "నైపుణ్యాలు",
    chat: "AI మెంటర్",
    submit: "విశ్లేషించండి",
    fullName: "పూర్తి పేరు",
    educationLevel: "చదువు",
    preferredLocation: "ప్రాంతం",
    interests: "ఆసక్తులు",
    enterName: "మీ పేరు రాయండి",
    locationPlaceholder: "ఉదా. హైదరాబాద్",
    chatPlaceholder: "మీ సందేహాలను అడగండి...",
    learnSkills: "నైపుణ్యాలను నేర్చుకోండి"
  },
  [IndianLanguage.MARATHI]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver मध्ये स्वागत आहे",
    profile: "माझी प्रोफाइल",
    recommendations: "करिअर मार्ग",
    skills: "कौशल्य",
    chat: "AI मार्गदर्शक",
    submit: "विश्लेषण करा",
    fullName: "पूर्ण नाव",
    educationLevel: "शिक्षण",
    preferredLocation: "पसंतीचे ठिकाण",
    interests: "आवडी",
    enterName: "तुमचे नाव टाका",
    locationPlaceholder: "उदा. पुणे, मुंबई",
    chatPlaceholder: "करिअरबद्दल विचारा...",
    learnSkills: "कौशल्य शिका"
  },
  [IndianLanguage.TAMIL]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver-க்கு வரவேற்கிறோம்",
    profile: "சுயவிவரம்",
    recommendations: "வேலை வாய்ப்புகள்",
    skills: "திறன்கள்",
    chat: "AI வழிகாட்டி",
    submit: "பகுப்பாய்வு",
    fullName: "முழு பெயர்",
    educationLevel: "கல்வி",
    preferredLocation: "விருப்பமான இடம்",
    interests: "விருப்பங்கள்",
    enterName: "உங்கள் பெயரை உள்ளிடவும்",
    locationPlaceholder: "எ.கா. சென்னை",
    chatPlaceholder: "வேலை வாய்ப்பு பற்றி கேட்கவும்...",
    learnSkills: "திறன்களைக் கற்கவும்"
  },
  [IndianLanguage.GUJARATI]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver માં આપનું સ્વાગત છે",
    profile: "મારી પ્રોફાઇલ",
    submit: "વિશ્લેષણ કરો",
    fullName: "પૂરું નામ",
    interests: "રસ",
    chatPlaceholder: "કારકિર્દી વિશે પૂછો..."
  },
  [IndianLanguage.KANNADA]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver ಗೆ ಸ್ವಾಗತ",
    profile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
    submit: "ವಿಶ್ಲೇಷಿಸಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    interests: "ಆಸಕ್ತಿಗಳು",
    chatPlaceholder: "ವೃತ್ತಿಜೀವನದ ಬಗ್ಗೆ ಕೇಳಿ..."
  },
  [IndianLanguage.MALAYALAM]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver-ലേക്ക് സ്വാഗതം",
    profile: "എന്റെ പ്രൊഫൈൽ",
    submit: "വിശകലനം ചെയ്യുക",
    fullName: "മുഴുവൻ പേര്",
    interests: "താൽപ്പര്യങ്ങൾ",
    chatPlaceholder: "കരിയറിനെക്കുറിച്ച് ചോദിക്കുക..."
  },
  [IndianLanguage.URDU]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver میں خوش آمدید",
    profile: "میری پروفائل",
    submit: "تجزیہ کریں",
    fullName: "پورا نام",
    interests: "دلچسپیاں",
    chatPlaceholder: "کیریئر کے بارے میں پوچھیں..."
  },
  [IndianLanguage.ODIA]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver କୁ ସ୍ୱାଗତ",
    profile: "ମୋର ପ୍ରୋଫାଇଲ୍",
    submit: "ବିଶ୍ଳେଷଣ କରନ୍ତୁ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    interests: "ଆଗ୍ରହ",
  },
  [IndianLanguage.PUNJABI]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    profile: "ਮੇਰੀ ਪ੍ਰੋਫਾਈਲ",
    submit: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    interests: "ਦਿਲਚਸਪੀਆਂ",
  },
  [IndianLanguage.ASSAMESE]: {
    ...BASE_TRANSLATIONS,
    welcome: "PathWeaver লৈ স্বাগতম",
    profile: "মোৰ প্ৰফাইল",
    submit: "বিশ্লেষণ কৰক",
    fullName: "সম্পূৰ্ণ নাম",
    interests: "আগ্ৰহ",
  }
};

export const getTranslation = (lang: IndianLanguage, key: keyof typeof BASE_TRANSLATIONS): string => {
  const map = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS[IndianLanguage.ENGLISH];
  return (map as any)[key] || UI_TRANSLATIONS[IndianLanguage.ENGLISH][key] || key;
};
