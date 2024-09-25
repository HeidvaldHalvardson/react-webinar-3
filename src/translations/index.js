import React, {createContext, useState, useContext, useEffect} from 'react';
import en from "./en/translation";
import ru from "./ru/translation";

const LanguageContext = createContext();
const LANGUAGE_STORAGE_KEY = 'language';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');
  let translation = null

  useEffect(() => {
    if (sessionStorage.getItem(LANGUAGE_STORAGE_KEY)) {
      setLanguage(sessionStorage.getItem(LANGUAGE_STORAGE_KEY));
    }
  },[])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    sessionStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
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
