import React, { useState, useEffect, useCallback } from 'react';
import { upgradesData } from './Data/upgradesData.js';
import Sidebar from './components/Sidebar.jsx';
import MainContent from './components/MainContent.jsx';
import LanguageSwitcher from './components/LanguageSwitcher';
import './styles/App.css';

const initialGameState = {
  score: 0,
  cps: 0,
  clickValue: 1,
  upgrades: {
    unlockBuildings: { purchased: false, unlocked: false },
    floatingNumbers: { purchased: false, unlocked: false },
    fancyButton: { purchased: false, unlocked: false },
    fancyShopItems: { purchased: false, unlocked: false },
    unlockLanguages: { purchased: false, unlocked: false },
  },
  buildings: {
    autoClicker: { owned: 0, baseCost: 25, cps: 1 },
    ponteiroPro: { owned: 0, baseCost: 150, cps: 5 },
  },
};

function App() {
  const [gameState, setGameState] = useState(initialGameState);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // começa fechada
  const [floatingNumbers, setFloatingNumbers] = useState([]);

  const recalculateCPS = useCallback(() => {
    let totalCPS = 0;
    for (const buildingId in gameState.buildings) {
      const building = gameState.buildings[buildingId];
      totalCPS += building.owned * building.cps;
    }
    setGameState(prev => ({ ...prev, cps: totalCPS }));
  }, [gameState.buildings]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setGameState(prev => ({ ...prev, score: prev.score + prev.cps }));
    }, 1000);
    return () => clearInterval(gameInterval);
  }, [gameState.cps]); 

  useEffect(() => {
    recalculateCPS();
  }, [gameState.buildings, recalculateCPS]);

  useEffect(() => {
    const newUpdates = {};

    for (const upgradeId in upgradesData) {
      const upgradeInfo = upgradesData[upgradeId];
      const upgradeState = gameState.upgrades[upgradeId];

      if (gameState.score >= upgradeInfo.requiredScore && !upgradeState.unlocked) {
        newUpdates[upgradeId] = { ...upgradeState, unlocked: true };
      }
    }

    if (Object.keys(newUpdates).length > 0) {
      setGameState(prev => ({...prev, upgrades: {...prev.upgrades, ...newUpdates,},
    }));
  }

  }, [gameState.score, gameState.upgrades]);

  // Função para o clique principal
  const handleManualClick = (event) => {
    setGameState(prev => ({ ...prev, score: prev.score + prev.clickValue }));
    if (gameState.upgrades.floatingNumbers.purchased) {
      const newFloatingNumber = {
        id: Date.now() + Math.random(), 
        value: `+${gameState.clickValue}`,
        x: event.clientX,
        y: event.clientY,
      };
      setFloatingNumbers(prev => [...prev, newFloatingNumber]);
      setTimeout(() => {
        setFloatingNumbers(current => current.filter(n => n.id !== newFloatingNumber.id));
      }, 1500);
    }
  };


const purchaseUpgrade = (upgradeId) => {
    const upgradeInfo = upgradesData[upgradeId]; 
    const upgradeStatus = gameState.upgrades[upgradeId];

    if (gameState.score >= upgradeInfo.cost && !upgradeStatus.purchased) {
        setGameState(prev => ({...prev, score: prev.score - upgradeInfo.cost, upgrades: { ...prev.upgrades, [upgradeId]: { ...upgradeStatus, purchased: true },},
        }));

        if (upgradeInfo.applyEffect) {
          setGameState(prev => upgradeInfo.applyEffect(prev));
        }
    }
};

  const purchaseBuilding = (buildingId) => {
    const building = gameState.buildings[buildingId];
    const currentCost = Math.ceil(building.baseCost * Math.pow(1.15, building.owned));
    if (gameState.score >= currentCost) {
      setGameState(prev => ({
        ...prev,
        score: prev.score - currentCost,
        buildings: {
          ...prev.buildings,
          [buildingId]: { ...building, owned: building.owned + 1 },
        },
      }));
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="App">
      
      {/* Hamburguer */}
      { !isSidebarOpen && (
        <div id="menu-toggle" onClick={toggleSidebar}>
          <span></span><span></span><span></span>
        </div>
      )}

      {/* Renderiza os números flutuantes */}
      {floatingNumbers.map(num => (
        <div key={num.id} className="floating-number" style={{ left: `${num.x - 10}px`, top: `${num.y - 30}px`}}>
          {num.value}
        </div>
      ))}

      {/* Language */}
      {gameState.upgrades.unlockLanguages?.purchased && <LanguageSwitcher />}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        gameState={gameState} 
        purchaseUpgrade={purchaseUpgrade} 
        purchaseBuilding={purchaseBuilding} 
        onClose={toggleSidebar}
        areItemsUpgraded={gameState.upgrades.fancyShopItems?.purchased}
      />
      
      <MainContent 
        score={gameState.score} 
        cps={gameState.cps} 
        onMainButtonClick={handleManualClick} 
        isSidebarOpen={isSidebarOpen}
        isButtonUpgraded={gameState.upgrades.fancyButton?.purchased} 
      />
    </div>
  );
}

export default App;