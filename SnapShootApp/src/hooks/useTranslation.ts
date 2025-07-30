import { useLanguage } from '../contexts/LanguageContext';
import { translations, getNestedValue, TranslationKey } from '../locales';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    const currentTranslations = translations[language];
    return getNestedValue(currentTranslations, key);
  };

  return { t, language };
};

export default useTranslation; 