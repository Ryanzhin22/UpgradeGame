import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import BuffButton from './BuffButton';
import '../styles/BuffsPanel.css';

function BuffsPanel({ gameState, activateBuff }) {
  const [isOpen, setIsOpen] = useState(false);
  const { translate } = useLanguage();

  return (
    <div className={`buffs-panel-container ${isOpen ? 'open' : ''}`}>
      <button className="panel-toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <div className="buffs-panel">
        <h4>{translate('buffs_title')}</h4>
        <BuffButton
          buffId="clickFrenzy"
          buffInfo={gameState.buffs.clickFrenzy}
          activateBuff={activateBuff}
          icon="🖱️"
          name={translate('buff_clickFrenzy_name')}
        />
        <BuffButton
          buffId="cpsBoost"
          buffInfo={gameState.buffs.cpsBoost}
          activateBuff={activateBuff}
          icon="⚡"
          name={translate('buff_cpsBoost_name')}
        />
        <BuffButton
          buffId="criticalLuck"
          buffInfo={gameState.buffs.criticalLuck}
          activateBuff={activateBuff}
          icon="🎯"
          name={translate('buff_criticalLuck_name')}
        />
      </div>
    </div>
  );
}

export default BuffsPanel;