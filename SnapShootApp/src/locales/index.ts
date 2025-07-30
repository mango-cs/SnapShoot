import { en, TranslationKeys } from './en';
import { hi } from './hi';
import { te } from './te';
import { ta } from './ta';
import { kn } from './kn';
import { Language } from '../contexts/LanguageContext';

// All translations
export const translations: Record<Language, TranslationKeys> = {
  en,
  hi,
  te,
  ta,
  kn,
};

// Type for nested keys (for better TypeScript support)
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<TranslationKeys>;

// Helper function to get nested value from object using dot notation
export const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
};

// Export translation utilities
export { TranslationKeys } from './en';
export * from './en';
export * from './hi';
export * from './te';
export * from './ta';
export * from './kn'; 