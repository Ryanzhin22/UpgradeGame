import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { achievementsData } from '../Data/achievementsData';
import '../styles/AchievementsModal.css';

function AchievementsModal({ unlockedAchievements, onClose }) {
  const { translate } = useLanguage();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content achievements-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>&times;</button>
        <h2>{translate('achievements_title')}</h2>
        
        <div className="achievements-grid">
          {Object.keys(achievementsData).map(achId => {
            const achievement = achievementsData[achId];
            const isUnlocked = unlockedAchievements[achId];
            const Icon = achievement.IconComponent;

            return (
              <div key={achId} className={`achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">{Icon && <Icon />}</div>
                {/* Tooltip que só aparece no hover */}
                <div className="tooltip">
                  <strong className="tooltip-title">
                    {isUnlocked ? translate(achievement.nameKey) : '???'}
                  </strong>
                  <p className="tooltip-desc">
                    {isUnlocked ? translate(achievement.descKey) : translate('ach_locked_desc')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AchievementsModal;