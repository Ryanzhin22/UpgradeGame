import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Footer.css'; 

function Footer() {
  const { translate } = useLanguage();
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="game-footer">
      <p>{translate('footer_copyright', { year: currentYear })}</p>
    </footer>
  );
}

export default Footer;