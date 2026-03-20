import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'my';

interface Translations {
  [key: string]: {
    en: string;
    my: string;
  };
}

export const translations: Translations = {
  // Bottom Nav
  explore: { en: 'Explore', my: 'ရှာဖွေရန်' },
  bookings: { en: 'Bookings', my: 'ဘိုကင်များ' },
  queue: { en: 'Queue', my: 'တုံကင်' },
  profile: { en: 'Profile', my: 'ပရိုဖိုင်' },
  
  // Home Screen
  welcomeBack: { en: 'Welcome back,', my: 'ပြန်လည်ကြိုဆိုပါတယ်' },
  searchPlaceholder: { en: 'Search salons, spas, services...', my: 'ဆိုင်များ၊ ဝန်ဆောင်မှုများ ရှာဖွေရန်...' },
  activeQueue: { en: 'Active Queue', my: 'လက်ရှိတုံကင်' },
  noActiveToken: { en: 'No active token', my: 'တုံကင်လက်မှတ်မရှိသေးပါ' },
  bookNow: { en: 'Book Now', my: 'ဘိုကင်လုပ်ရန်' },
  categories: { en: 'Categories', my: 'ကဏ္ဍများ' },
  seeAll: { en: 'See All', my: 'အားလုံးကြည့်ရန်' },
  nearbyForYou: { en: 'Nearby for You', my: 'သင့်အနီးအနားရှိ' },
  viewMap: { en: 'View Map', my: 'မြေပုံကြည့်ရန်' },
  
  // Categories
  hair: { en: 'Hair', my: 'ဆံပင်' },
  nails: { en: 'Nails', my: 'လက်သည်း' },
  massage: { en: 'Massage', my: 'အနှိပ်' },
  facial: { en: 'Facial', my: 'မျက်နှာ' },
  spa: { en: 'Spa', my: 'စပါး' },
  
  // Profile
  personalInfo: { en: 'Personal Information', my: 'ကိုယ်ရေးအချက်အလက်' },
  security: { en: 'Security & Privacy', my: 'လုံခြုံရေးနှင့် ကိုယ်ရေးလုံခြုံမှု' },
  notifications: { en: 'Notification Settings', my: 'အကြောင်းကြားစာ ဆက်တင်များ' },
  payment: { en: 'Payment Methods', my: 'ငွေပေးချေမှုစနစ်များ' },
  help: { en: 'Help & Support', my: 'အကူအညီနှင့် ပံ့ပိုးမှု' },
  switchMerchant: { en: 'Switch to Merchant Mode', my: 'ကုန်သည်မုဒ်သို့ ပြောင်းရန်' },
  logout: { en: 'Log Out', my: 'ထွက်ရန်' },
  language: { en: 'Language', my: 'ဘာသာစကား' },
  
  // Queue Screen
  liveQueue: { en: 'Live Queue', my: 'တိုက်ရိုက်တုံကင်' },
  yourToken: { en: 'Your Token', my: 'သင့်တုံကင်လက်မှတ်' },
  position: { en: 'Position', my: 'အဆင့်' },
  waitTime: { en: 'Wait Time', my: 'စောင့်ဆိုင်းချိန်' },
  ahead: { en: 'ahead', my: 'ယောက်' },
  mins: { en: 'mins', my: 'မိနစ်' },
  runningLate: { en: 'Running Late', my: 'နောက်ကျမည်' },
  imHere: { en: "I'm Here (Check-in)", my: 'ရောက်ရှိပါပြီ' },
  
  // Language Selection
  selectLanguage: { en: 'Select Language', my: 'ဘာသာစကားရွေးချယ်ပါ' },
  continue: { en: 'Continue', my: 'ဆက်သွားရန်' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
