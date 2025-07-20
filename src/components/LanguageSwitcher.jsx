import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; 
import '../styles/LanguageSwitcher.css'; 

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button 
        className={language === 'pt' ? 'active' : ''} 
        onClick={() => setLanguage('pt')}
      >
        PT
      </button>
      <button 
        className={language === 'en' ? 'active' : ''} 
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;