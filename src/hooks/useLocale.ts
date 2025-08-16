import { useState, useEffect } from 'react';
import { LocaleContent, ptContent, enContent } from '@/data/portfolio';
import { useLocaleContext } from '@/context/LocaleContext';

export type Locale = 'pt' | 'en';

// This hook provides the locale state and logic
export const _useProvideLocale = () => {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem('locale') as Locale;
    if (stored && (stored === 'pt' || stored === 'en')) {
      return stored;
    }
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

// This hook consumes the locale context
export const useLocale = () => {
  return useLocaleContext();
};
