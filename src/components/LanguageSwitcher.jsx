import React from 'react';
import { useLanguage } from '../contexts/LanguageContext'; 
import '../styles/LanguageSwitcher.css'; 

import BrazilFlag from '../assets/flags/brazil.png';
import UsaFlag from '../assets/flags/usa.png';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button 
        className={language === 'pt' ? 'active' : ''} 
        onClick={() => setLanguage('pt')}
        title="Português"
      ><img src={BrazilFlag} alt="Brazil Flag" /></button>
      <button 
        className={language === 'en' ? 'active' : ''} 
        onClick={() => setLanguage('en')}
        title='English'
      ><img src={UsaFlag} alt="USA Flag" /></button>
    </div>
  );
}

export default LanguageSwitcher;