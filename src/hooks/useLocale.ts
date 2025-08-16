import { useState, useEffect } from 'react';
import { LocaleContent, ptContent, enContent } from '@/data/portfolio';

export type Locale = 'pt' | 'en';

export const useLocale = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('locale') as Locale;
    if (stored && (stored === 'pt' || stored === 'en')) {
      return stored;
    }
    
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('pt') ? 'pt' : 'en';
  });

  const [content, setContent] = useState<LocaleContent>(() => 
    locale === 'pt' ? ptContent : enContent
  );

  useEffect(() => {
    setContent(locale === 'pt' ? ptContent : enContent);
    localStorage.setItem('locale', locale);
  }, [locale]);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return {
    locale,
    content,
    changeLocale,
  };
};