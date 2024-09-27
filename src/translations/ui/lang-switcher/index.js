import React from 'react';
import { useLanguage } from "../../index";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  if (language === 'ru') return <button onClick={() => changeLanguage('en')}>English</button>
  if (language === 'en') return <button onClick={() => changeLanguage('ru')}>Русский</button>
};

export default LanguageSwitcher;
