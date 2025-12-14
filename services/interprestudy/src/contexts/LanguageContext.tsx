import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    solutions: 'Solutions',
    interpreHub: 'InterpreHub',
    dashboard: 'Dashboard',
    settings: 'Settings',
    resources: 'Resources',
    about: 'About',
    contact: 'Contact',
    signIn: 'Sign In',
    signOut: 'Sign Out',
  },
  es: {
    solutions: 'Soluciones',
    interpreHub: 'InterpreHub',
    dashboard: 'Panel',
    settings: 'Configuración',
    resources: 'Recursos',
    about: 'Acerca de',
    contact: 'Contacto',
    signIn: 'Iniciar Sesión',
    signOut: 'Cerrar Sesión',
  },
  fr: {
    solutions: 'Solutions',
    interpreHub: 'InterpreHub',
    dashboard: 'Tableau de bord',
    settings: 'Paramètres',
    resources: 'Ressources',
    about: 'À propos',
    contact: 'Contact',
    signIn: 'Se connecter',
    signOut: 'Se déconnecter',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('en');
  const { user } = useAuth();

  const loadUserLanguage = useCallback(async () => {
    if (!user?.id) return;
    
    const { data } = await supabase
      .from('user_settings')
      .select('preferred_language')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data?.preferred_language) {
      setLanguageState(data.preferred_language);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      loadUserLanguage();
    }
  }, [user, loadUserLanguage]);

  const setLanguage = async (lang: string) => {
    setLanguageState(lang);
    
    if (user) {
      await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          preferred_language: lang,
        }, {
          onConflict: 'user_id'
        });
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
