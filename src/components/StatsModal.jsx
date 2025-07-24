import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/StatsModal.css';

function StatsModal({ stats, onClose }) {
  const { translate } = useLanguage();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal-btn" onClick={onClose}>&times;</button>
        <h2>{translate('stats_title')}</h2>
        
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">{translate('stats_total_clicks')}:</span>
            <span className="stat-value">{stats.totalClicks.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">{translate('stats_points_from_clicks')}:</span>
            <span className="stat-value">{Math.floor(stats.pointsFromClicks).toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">{translate('stats_points_from_minigames')}:</span>
            <span className="stat-value">{stats.pointsFromMinigames.toLocaleString()}</span>
          </div>
          
          <hr className='statsBuildingHR'/>

          <h4 className='statsBuildingProduction'>{translate('stats_building_production')}</h4>
          <div className="stat-item">
            <span className="stat-label">{translate('building_autoClicker_name')}:</span>
            <span className="stat-value">{Math.floor(stats.pointsFromBuildings.autoClicker).toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">{translate('building_ponteiroPro_name')}:</span>
            <span className="stat-value">{Math.floor(stats.pointsFromBuildings.ponteiroPro).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsModal;