import React from 'react';
import ShopItem from './ShopItem';
import { upgradesData } from '../Data/upgradesData.js';
import '../styles/Sidebar.css';

function Sidebar({ isOpen, gameState, purchaseUpgrade, purchaseBuilding, onClose, areItemsUpgraded }) {
  const { score, upgrades, buildings } = gameState;

  return (
    <aside id="sidebar" className={isOpen ? 'open' : ''}>

      <button class="close-sidebar-btn" onClick={onClose}>&times;</button>

      <h2>Upgrades</h2>
      <div id="upgrades-section">
        {Object.values(upgradesData).map(upgradeInfo => {
          const { id, name, description, cost } = upgradeInfo;
          const upgradeStatus = upgrades[id];
          if (!upgradeStatus || upgradeStatus.purchased) {
            return null;
          }

          return (
            <ShopItem
              key={id}
              name={name}
              description={description}
              costText={`Cost: ${cost} score`}
              isPurchased={upgradeStatus.purchased}
              isDisabled={score < cost}
              onClick={() => purchaseUpgrade(id)}
              isUpgraded={areItemsUpgraded}
            />
          );
        })}
      </div>


      {/* A seção de construções só aparece se a melhoria foi comprada */}
      {upgrades.unlockBuildings.purchased && (
        <div id="buildings-section">
          <h2>Constructions</h2>
          <div id="building-list">
            {Object.keys(buildings).map(id => {
              const building = buildings[id];
              const currentCost = Math.ceil(building.baseCost * Math.pow(1.15, building.owned));
              return (
                <ShopItem
                  key={id}
                  name={id.charAt(0).toUpperCase() + id.slice(1)} 
                  ownedCount={building.owned}                    
                  description={`Give you ${building.cps} CPS.`}
                  costText={`Cost: ${currentCost.toLocaleString('pt-BR')} Score`}
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