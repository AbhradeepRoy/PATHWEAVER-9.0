import React, { useState } from 'react';
import { CareerRecommendation, IndianLanguage } from '../types';
import { getTranslation } from '../constants';
import { Share2, TrendingUp, DollarSign, MapPin, Target, ArrowRight } from 'lucide-react';

interface Props {
  recommendations: CareerRecommendation[];
  language: IndianLanguage;
  isLoading: boolean;
  onSkillAction: () => void;
}

const RecommendationsView: React.FC<Props> = ({ recommendations, language, isLoading, onSkillAction }) => {
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState<'match' | 'salary'>('match');

  const t = (key: any) => getTranslation(language, key);

  const parseSalary = (range: string) => {
    // Very rough heuristic for sorting salary strings "5,00,000 - 10,00,000"
    const match = range.replace(/[^0-9-]/g, '').split('-')[0];
    return match ? parseInt(match) : 0;
  };

  const filtered = recommendations
    .filter(r => r.title.toLowerCase().includes(filterText.toLowerCase()) || r.description.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'salary') return parseSalary(b.salaryRange) - parseSalary(a.salaryRange);
      return 0;
    });

  const handleShare = async (career: CareerRecommendation) => {
    const text = `Check out this career path: ${career.title} - ${career.description}. Predicted Salary: ${career.salaryRange}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PathWeaver Recommendation',
          text: text,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Career details copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-600 dark:text-gray-300 animate-pulse">{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('recommendations')}
        </h2>
        
        <div className="flex gap-3">
            <input 
                type="text" 
                placeholder={t('filterPlaceholder')}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
            />
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
            >
                <option value="match">Sort by Match</option>
                <option value="salary">Sort by Salary</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((career, index) => (
          <div 
            key={career.id || index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                  {career.title}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-bold ${career.matchScore > 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {career.matchScore}% {t('match')}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {career.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                  <DollarSign size={16} className="text-green-500" />
                  <span className="font-semibold">{career.salaryRange}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                  <TrendingUp size={16} className="text-blue-500" />
                  <span>{career.marketOutlook}</span>
                </div>
              </div>

               <div className="mb-4">
                 <p className="text-xs text-gray-400 mb-1">{t('skillsGap')}</p>
                 <div className="flex flex-wrap gap-1">
                   {career.requiredSkills.slice(0, 3).map(s => (
                     <span key={s} className="px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs rounded">
                       {s}
                     </span>
                   ))}
                   {career.requiredSkills.length > 3 && <span className="text-xs text-gray-400">+{career.requiredSkills.length - 3}</span>}
                 </div>
               </div>
            </div>

            <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => handleShare(career)}
                className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={t('share')}
              >
                <Share2 size={20} />
              </button>
              <button 
                onClick={onSkillAction}
                className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                {t('learnSkills')} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsView;