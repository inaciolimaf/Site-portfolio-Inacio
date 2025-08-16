import { createContext, useContext, ReactNode } from 'react';
import { LocaleContent } from '@/data/portfolio';
import { Locale, _useProvideLocale } from '@/hooks/useLocale'; // Import Locale type and _useProvideLocale

interface LocaleContextType {
  locale: Locale;
  content: LocaleContent;
  changeLocale: (newLocale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
};

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const { locale, content, changeLocale } = _useProvideLocale();

  return (
    <LocaleContext.Provider value={{ locale, content, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};