import React, { useState } from 'react';
import { UserProfile, EducationLevel, IndianLanguage } from '../types';
import { EDUCATION_LEVELS, getTranslation } from '../constants';
import { Plus, X, BookOpen, Briefcase, MapPin, User } from 'lucide-react';

interface Props {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  language: IndianLanguage;
  onNext: (p?: UserProfile) => void;
}

const ProfileView: React.FC<Props> = ({ profile, setProfile, language, onNext }) => {
  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [animatingTag, setAnimatingTag] = useState<string | null>(null);
  
  // Helper to type-safely get translation
  const t = (key: any) => getTranslation(language, key);

  const handleAddInterest = () => {
    if (interestInput.trim() && !profile.interests.includes(interestInput.trim())) {
      const newVal = interestInput.trim();
      setProfile({ ...profile, interests: [...profile.interests, newVal] });
      setInterestInput("");
      triggerAnimation(`interest-${newVal}`);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      const newVal = skillInput.trim();
      setProfile({ ...profile, skills: [...profile.skills, newVal] });
      setSkillInput("");
      triggerAnimation(`skill-${newVal}`);
    }
  };

  const removeInterest = (item: string) => {
    setProfile({ ...profile, interests: profile.interests.filter(i => i !== item) });
  };

  const removeSkill = (item: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(i => i !== item) });
  };

  const triggerAnimation = (id: string) => {
    setAnimatingTag(id);
    setTimeout(() => setAnimatingTag(null), 500);
  };

  const handleAnalyze = () => {
    let currentInterests = [...profile.interests];
    let currentSkills = [...profile.skills];
    let hasUpdates = false;

    if (interestInput.trim() && !currentInterests.includes(interestInput.trim())) {
      currentInterests.push(interestInput.trim());
      setInterestInput("");
      hasUpdates = true;
    }

    if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
      currentSkills.push(skillInput.trim());
      setSkillInput("");
      hasUpdates = true;
    }

    const finalProfile = { ...profile, interests: currentInterests, skills: currentSkills };

    if (hasUpdates) {
      setProfile(finalProfile);
    }

    onNext(finalProfile);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-fade-in border border-gray-100 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {t('profile')}
      </h2>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <User size={18} /> {t('fullName')}
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            placeholder={t('enterName')}
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <BookOpen size={18} /> {t('educationLevel')}
          </label>
          <select
            value={profile.educationLevel}
            onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value as EducationLevel })}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
          >
            {EDUCATION_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <MapPin size={18} /> {t('preferredLocation')}
          </label>
          <input
            type="text"
            value={profile.preferredLocation}
            onChange={(e) => setProfile({ ...profile, preferredLocation: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder={t('locationPlaceholder')}
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('interests')}</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
              className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder={t('interestPlaceholder')}
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="p-3 bg-primary text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((item) => (
              <span
                key={item}
                className={`flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-sm font-medium
                  ${animatingTag === `interest-${item}` ? 'animate-bounce-short ring-2 ring-primary' : ''}
                  transition-all duration-300`}
              >
                {item}
                <button onClick={() => removeInterest(item)} className="hover:text-red-500"><X size={14} /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('skills')}</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1 p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder={t('skillPlaceholder')}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="p-3 bg-secondary text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((item) => (
              <span
                key={item}
                className={`flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm font-medium
                   ${animatingTag === `skill-${item}` ? 'animate-bounce-short ring-2 ring-secondary' : ''}
                   transition-all duration-300`}
              >
                {item}
                <button onClick={() => removeSkill(item)} className="hover:text-red-500"><X size={14} /></button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          {t('submit')}
        </button>
      </div>
    </div>
  );
};

export default ProfileView;