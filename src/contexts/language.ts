import { createContext } from 'react';

// Define the shape of a language object
export interface Language {
  code: string;
  name: string;
}

// Define the shape of the context
export interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  supportedLanguages: Language[];
  t: (key: string) => string;
}

// Create the context and export it
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
