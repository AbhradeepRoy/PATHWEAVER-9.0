import React, { useState, useEffect } from 'react';
import { UserProfile, EducationLevel, IndianLanguage, CareerRecommendation, SkillSuggestion } from './types';
import { LANGUAGES, MOTIVATIONAL_QUOTES, getTranslation } from './constants';
import { generateCareerRecommendations, getSkillSuggestions } from './services/geminiService';
import ProfileView from './components/ProfileView';
import RecommendationsView from './components/RecommendationsView';
import ChatBot from './components/ChatBot';
import SkillSuggestionsView from './components/SkillSuggestionsView';
import { Sun, Moon, Globe, Menu, X, Rocket, GraduationCap, MessageCircle, BarChart2 } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<IndianLanguage>(IndianLanguage.ENGLISH);
  const [currentView, setCurrentView] = useState<'profile' | 'recommendations' | 'skills' | 'chat'>('profile');
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Data States
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    educationLevel: EducationLevel.HIGH_SCHOOL,
    interests: [],
    skills: [],
    preferredLocation: ""
  });
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [skillSuggestions, setSkillSuggestions] = useState<SkillSuggestion[]>([]);
  
  // Loading States
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [loadingSkills, setLoadingSkills] = useState(false);

  // Theme Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Motivational Quote Rotation on View Change
  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));
  }, [currentView]);

  const handleGenerateRecommendations = async (updatedProfile?: UserProfile) => {
    // Prefer the updated profile if passed (handling async state issues), else fall back to current state
    const activeProfile = (updatedProfile && 'interests' in updatedProfile) ? updatedProfile : profile;

    if (activeProfile.interests.length === 0 && activeProfile.skills.length === 0) {
      alert("Please add at least one interest or skill to generate recommendations.");
      return;
    }
    
    setCurrentView('recommendations');
    setLoadingRecs(true);
    
    const recs = await generateCareerRecommendations(activeProfile, language);
    setRecommendations(recs);
    setLoadingRecs(false);

    // Auto-fetch skill suggestions if we have recommendations
    if (recs.length > 0) {
      setLoadingSkills(true);
      const skills = await getSkillSuggestions(recs, activeProfile, language);
      setSkillSuggestions(skills);
      setLoadingSkills(false);
    }
  };

  const navItems = [
    { id: 'profile', label: getTranslation(language, 'profile'), icon: <UserIcon /> },
    { id: 'recommendations', label: getTranslation(language, 'recommendations'), icon: <Rocket size={18} /> },
    { id: 'skills', label: getTranslation(language, 'skills'), icon: <BarChart2 size={18} /> },
    { id: 'chat', label: getTranslation(language, 'chat'), icon: <MessageCircle size={18} /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('profile')}>
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PATHWEAVER
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                    ${currentView === item.id 
                      ? 'bg-primary/10 text-primary dark:text-indigo-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <div className="relative group">
                 <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                   <Globe size={20} />
                   <span className="text-xs font-bold md:hidden">{language.substring(0, 2)}</span>
                 </button>
                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden group-hover:block p-1 max-h-60 overflow-y-auto z-50">
                   {LANGUAGES.map(lang => (
                     <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${language === lang ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-200'}`}
                     >
                       {lang}
                     </button>
                   ))}
                 </div>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button 
                className="md:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as any);
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentView === item.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Motivational Quote Banner */}
        <div className="mb-8 text-center animate-fade-in">
          <blockquote className="text-lg italic text-gray-600 dark:text-gray-400 font-medium">
            "{MOTIVATIONAL_QUOTES[quoteIndex].text}"
            <footer className="text-sm text-gray-400 mt-1">— {MOTIVATIONAL_QUOTES[quoteIndex].author}</footer>
          </blockquote>
        </div>

        {currentView === 'profile' && (
          <ProfileView 
            profile={profile} 
            setProfile={setProfile} 
            language={language}
            onNext={handleGenerateRecommendations}
          />
        )}

        {currentView === 'recommendations' && (
          <RecommendationsView 
            recommendations={recommendations}
            language={language}
            isLoading={loadingRecs}
            onSkillAction={() => setCurrentView('skills')}
          />
        )}

        {currentView === 'skills' && (
          <SkillSuggestionsView 
            suggestions={skillSuggestions}
            isLoading={loadingSkills}
            language={language}
          />
        )}

        {currentView === 'chat' && (
          <ChatBot profile={profile} language={language} />
        )}

      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} PathWeaver AI Navigator. Empowering Indian Students.</p>
        </div>
      </footer>
    </div>
  );
};

// Helper Icon
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
)

export default App;