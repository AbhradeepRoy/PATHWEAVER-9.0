import React from 'react';
import { SkillSuggestion } from '../types';
import { Book, ExternalLink } from 'lucide-react';
import { getTranslation } from '../constants'; // Import getTranslation
import { IndianLanguage } from '../types'; // Import IndianLanguage

interface Props {
  suggestions: SkillSuggestion[];
  isLoading: boolean;
  language?: IndianLanguage; // Add language prop
}

const SkillSuggestionsView: React.FC<Props> = ({ suggestions, isLoading, language = IndianLanguage.ENGLISH }) => {
  const t = (key: any) => getTranslation(language, key);

  if (isLoading) {
     return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-600 dark:text-gray-300">{t('findingResources')}</p>
      </div>
    );
  }

  if (suggestions.length === 0) {
      return (
          <div className="text-center p-10">
              <h3 className="text-xl text-gray-500">{t('generateFirst')}</h3>
          </div>
      )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{t('skills')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-secondary">
            <div className="flex items-center gap-3 mb-3">
              <Book className="text-secondary" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{item.skill}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.reason}</p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">{t('recommendedResources')}</h4>
              <ul className="space-y-1">
                {item.resources.map((res, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <ExternalLink size={14} className="mt-1 flex-shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSuggestionsView;