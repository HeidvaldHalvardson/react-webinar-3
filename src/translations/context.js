import React, { createContext, useState, useContext } from 'react';
import en from "./en/translation";
import ru from "./ru/translation";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');
  let translation = null

  const changeLanguage = (lang) => {
    setLanguage(lang)
  };

  if (language === 'ru') {
    translation = ru
  } else if (language === 'en') {
    translation = en
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
