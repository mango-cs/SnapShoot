import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supported languages
export type Language = 'en' | 'hi' | 'te' | 'ta' | 'kn';

// Language labels for display (short form for header)
export const languageLabels: Record<Language, string> = {
  en: 'EN',
  hi: 'हि',
  te: 'తె',
  ta: 'த',
  kn: 'ಕ',
};

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isLoading: boolean;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Storage key for language preference
const LANGUAGE_STORAGE_KEY = '@snapshoot_language';

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = 'en',
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isLoading, setIsLoading] = useState(true);

  // Load language from storage on app start
  useEffect(() => {
    loadLanguageFromStorage();
  }, []);

  // Save language to storage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveLanguageToStorage(language);
    }
  }, [language, isLoading]);

  const loadLanguageFromStorage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && Object.keys(languageLabels).includes(savedLanguage)) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.warn('Failed to load language from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLanguageToStorage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.warn('Failed to save language to storage:', error);
    }
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const toggleLanguage = () => {
    const languages: Language[] = ['en', 'hi', 'te', 'ta', 'kn'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguageState(languages[nextIndex]);
  };

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}; 