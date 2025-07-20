import React from 'react';
import ShopItem from './ShopItem';
import { upgradesData } from '../Data/upgradesData.js';
import { buildingsData } from '../Data/buildingsData.js';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, gameState, purchaseUpgrade, purchaseBuilding, onClose, areItemsUpgraded }) {
  const { score, upgrades, buildings } = gameState;
  const { translate, language } = useLanguage()

  return (
    <aside id="sidebar" className={isOpen ? 'open' : ''}>

      <button className="close-sidebar-btn" onClick={onClose}>&times;</button>

      <h2>{translate('upgrades_title')}</h2>
      <div id="upgrades-section">
        {Object.values(upgradesData)
        .filter(upgradeInfo => upgrades[upgradeInfo.id]?.unlocked)
        .map(upgradeInfo => {
          const { id, nameKey, descriptionKey, cost } = upgradeInfo;
          const upgradeStatus = upgrades[id];

          if (!upgradeStatus || upgradeStatus.purchased) {
            return null;
          }

          return (
            <ShopItem
              key={id}
              name={translate(nameKey)}
              description={translate(descriptionKey)}
              costText={translate('cost_text', { cost: cost.toLocaleString(language) })}
              isPurchased={upgradeStatus.purchased}
              isDisabled={score < cost}
              onClick={() => purchaseUpgrade(id)}
              isUpgraded={areItemsUpgraded}
            />
          );
        })}
      </div>


      {/* A seção de construções só aparece se a melhoria foi comprada */}
      {upgrades.unlockBuildings?.purchased && (
        <div id="buildings-section">
          <h2>{translate('buildings_title')}</h2>
          <div id="building-list">
            {Object.values(buildingsData).map(buildingInfo  => {
              const { id, nameKey } = buildingInfo;
              const buildingState = buildings[id];
              const currentCost = Math.ceil(buildingState.baseCost * Math.pow(1.15, buildingState.owned));

              return (
                <ShopItem
                  key={id}
                  name={translate(nameKey)} 
                  ownedCount={buildingState.owned}                    
                  description={translate('building_description', { cps: buildingState.cps })}
                  costText={translate('cost_text', { cost: currentCost.toLocaleString(language)  })}
                  isDisabled={score < currentCost}
                  onClick={() => purchaseBuilding(id)}
                  isUpgraded={areItemsUpgraded}
                />
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;