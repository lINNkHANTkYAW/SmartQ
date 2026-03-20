import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, Language } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export const LanguageSelectionScreen: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('language_selected', 'true');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-white p-8 justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-kbz-primary mx-auto mb-6">
          <Globe size={40} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">{t('selectLanguage')}</h1>
        <p className="text-gray-500 text-sm">Choose your preferred language to continue</p>
      </motion.div>

      <div className="space-y-4 mb-12">
        <button 
          onClick={() => setLanguage('en')}
          className={`w-full p-5 rounded-3xl border-2 transition-all flex justify-between items-center ${
            language === 'en' ? 'border-kbz-primary bg-blue-50' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇺🇸</span>
            <span className={`font-bold ${language === 'en' ? 'text-kbz-secondary' : 'text-gray-900'}`}>English</span>
          </div>
          {language === 'en' && <div className="w-6 h-6 bg-kbz-primary rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
        </button>

        <button 
          onClick={() => setLanguage('my')}
          className={`w-full p-5 rounded-3xl border-2 transition-all flex justify-between items-center ${
            language === 'my' ? 'border-kbz-primary bg-blue-50' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇲🇲</span>
            <span className={`font-bold ${language === 'my' ? 'text-kbz-secondary' : 'text-gray-900'}`}>မြန်မာဘာသာ</span>
          </div>
          {language === 'my' && <div className="w-6 h-6 bg-kbz-primary rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
        </button>
      </div>

      <button 
        onClick={handleContinue}
        className="w-full bg-kbz-primary text-white font-black py-4 rounded-3xl shadow-lg shadow-blue-100 active:scale-95 transition-transform cursor-pointer"
      >
        {t('continue')}
      </button>
    </div>
  );
};
