import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage, UserProfile, IndianLanguage } from '../types';
import { chatWithMentor } from '../services/geminiService';
import { getTranslation } from '../constants';

interface Props {
  profile: UserProfile;
  language: IndianLanguage;
}

const ChatBot: React.FC<Props> = ({ profile, language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Namaste ${profile.name}! How can I help you navigate your career journey today?`, timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = (key: any) => getTranslation(language, key);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await chatWithMentor(history, userMsg.text, profile, language);

    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex items-center gap-3">
        <Bot size={24} />
        <div>
          <h3 className="font-bold text-lg">PathWeaver {t('chat')}</h3>
          <p className="text-xs opacity-90">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs px-3 py-2 rounded-full animate-pulse">
               AI is thinking...
             </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t('chatPlaceholder')}
          className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button 
          onClick={handleSend}
          disabled={isTyping}
          className="p-3 bg-primary text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;