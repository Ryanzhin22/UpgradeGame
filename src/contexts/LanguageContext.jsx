import React, { createContext, useState, useContext } from 'react';
import pt from '../locales/pt.json';
import en from '../locales/en.json';

const languages = { pt, en };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const translate = (key) => {
    return languages[language][key] || key; // Retorna a tradução ou a própria chave se não encontrar
  };

  const value = {
    language,
    setLanguage,
    translate,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}