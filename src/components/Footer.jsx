import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaDiscord, FaGithub, FaGift } from 'react-icons/fa';
import '../styles/Footer.css'; 

function Footer({ isUpgraded }) {
  const { translate } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Versão simples do rodapé
  if (!isUpgraded) {
    return (
      <footer className="game-footer">
        <p>{translate('footer_copyright', { year: currentYear })}</p>
      </footer>
    );
  }

  // Versão melhorada do rodapé
  return (
    <footer className="game-footer upgraded">
      <div className="footer-left">
        <p>{translate('footer_copyright', { year: currentYear })}</p>
      </div>

      <div className="footer-right">
        <a href="#" className="footer-link" title="Discord">
          <FaDiscord />
          <span>Discord</span>
        </a>
        <button className="footer-button" disabled title="Em breve">
          <FaGift />
          {translate('footer_watch_ad')}
        </button>
        <div className="other-links-container">
          <button className="footer-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {translate('footer_other_links')}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="#">{translate('footer_link_wiki')}</a>
              <a href="https://github.com/ryanzhin22/upgradegame" target="_blank" rel="noopener noreferrer">
                <FaGithub /> {translate('footer_link_github')}
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;