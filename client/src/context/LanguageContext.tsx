import { createContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../lib/i18n';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Default to Hebrew, but check localStorage first
  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage || 'he';
    }
    return 'he';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set HTML dir attribute based on language
    const dir = language === 'he' || language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    
    // Set HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  // Translate function
  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      // Fallback to Hebrew if translation is missing
      return translations['he'][key] || key;
    }
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
