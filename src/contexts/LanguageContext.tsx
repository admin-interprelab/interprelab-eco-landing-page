import React, { useState, ReactNode } from 'react';
import { LanguageContext, Language } from './language';

// Define the props for the provider
interface LanguageProviderProps {
  children: ReactNode;
}

// List of supported languages
const supportedLanguages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Mandarin' },
    { code: 'ar', name: 'Arabic' },
];

const translations: Record<string, Record<string, string>> = {
    en: {
        interpreBot: "InterpreBot",
        interpreCoach: "InterpreCoach",
        interpreHub: "InterpreLinks",
        dashboard: "Dashboard",
        callTracker: "Call Tracker",
        settings: "Settings",
        resources: "Resources",
        about: "About Us",
        contact: "Contact",
        signOut: "Sign Out",
        signIn: "Sign In",
        myTranslations: "My Translations",
        interpreStudy: "InterpreStudy",
    },
    es: {
        interpreBot: "InterpreBot",
        interpreCoach: "InterpreCoach",
        interpreHub: "InterpreLinks",
        dashboard: "Panel",
        callTracker: "Rastreador de Llamadas",
        settings: "Configuración",
        resources: "Recursos",
        about: "Sobre Nosotros",
        contact: "Contacto",
        signOut: "Cerrar Sesión",
        signIn: "Iniciar Sesión",
        myTranslations: "Mis Traducciones",
        interpreStudy: "InterpreStudy",
    },
    // Add other languages here as needed
};


// Create the provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const value = {
    language,
    setLanguage,
    supportedLanguages,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
