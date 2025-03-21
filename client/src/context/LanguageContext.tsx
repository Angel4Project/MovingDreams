import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '@/lib/translations';

export type Language = 'he' | 'en' | 'ru' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to Hebrew
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      return (savedLanguage as Language) || 'he';
    }
    return 'he';
  });

  const getDirection = (lang: Language) => {
    return lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
  };
  
  // Set language with localStorage persistence
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLanguage);
      
      // Trigger full page translation by updating language classes
      document.documentElement.classList.remove('lang-he', 'lang-en', 'lang-ru', 'lang-ar');
      document.documentElement.classList.add(`lang-${newLanguage}`);
    }
  };

  const translate = (key: string): string => {
    const keys = key.split('.');
    let value = translations[language];
    
    // Try to get translation from selected language
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        // If translation is missing in the selected language, try Hebrew as fallback
        if (language !== 'he') {
          let fallbackValue = translations['he'];
          let foundInFallback = true;
          
          for (const fallbackKey of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
              fallbackValue = fallbackValue[fallbackKey as keyof typeof fallbackValue];
            } else {
              foundInFallback = false;
              break;
            }
          }
          
          if (foundInFallback) {
            return fallbackValue as string;
          }
        }
        
        // If all fails, return the key
        return key;
      }
    }
    
    return value as string;
  };

  // Setup language effects when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Update HTML dir and lang attributes
      document.documentElement.lang = language;
      document.documentElement.dir = getDirection(language);
      
      // Update language class for CSS styling
      document.documentElement.classList.remove('lang-he', 'lang-en', 'lang-ru', 'lang-ar');
      document.documentElement.classList.add(`lang-${language}`);
      
      // Update meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const descriptions = {
          he: 'אור להובלות - חברת הובלות מקצועית ואמינה המספקת שירותי הובלה באיכות גבוהה',
          en: 'Or Lehovalot - Professional and reliable moving company providing high-quality moving services',
          ru: 'Ор Леовалот - Профессиональная и надежная транспортная компания, предоставляющая высококачественные услуги по переезду',
          ar: 'أور ليهوفالوت - شركة نقل محترفة وموثوقة توفر خدمات نقل عالية الجودة'
        };
        metaDescription.setAttribute('content', descriptions[language]);
      }
    }
  }, [language]);

  const contextValue: LanguageContextType = {
    language, 
    setLanguage, 
    t: translate,
    dir: getDirection(language)
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// This is intentionally kept separate from the context export itself to avoid circular imports
function useLanguageInternal(): LanguageContextType {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}

export { useLanguageInternal as useLanguage };
