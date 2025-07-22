import React, { useState, useEffect, useCallback } from 'react';
import { upgradesData } from './Data/upgradesData.js';
import Sidebar from './components/Sidebar.jsx';
import MainContent from './components/MainContent.jsx';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer.jsx';
import { playSound } from './utils/audioManager';
import './styles/App.css';
import SpinningCursors from './components/SpinningCursors.jsx';
import MinigameIcon from './components/MinigameIcon.jsx';
import MinigameWindow from './components/MinigameWindow.jsx';
import ReactionGame from './components/ReactionGame.jsx';
import { minigamesData } from './Data/minigamesData.js';

const initialGameState = {
  score: 0,
  cps: 0,
  clickValue: 1,
  upgrades: {
    branding: { purchased: false, unlocked: false },
    unlockBuildings: { purchased: false, unlocked: false },
    floatingNumbers: { purchased: false, unlocked: false },
    fancyButton: { purchased: false, unlocked: false },
    strongerClicks1: { purchased: false, unlocked: false },
    spinningCursors: { purchased: false, unlocked: false },
    fancyShopItems: { purchased: false, unlocked: false },
    unlockSounds: { purchased: false, unlocked: false },
    unlockLanguages: { purchased: false, unlocked: false },
    strongerClicks2: { purchased: false, unlocked: false },
    criticalClicks: { purchased: false, unlocked: false },
    gameBackground: { purchased: false, unlocked: false },
    unlockFooter: { purchased: false, unlocked: false },
  },
  buildings: {
    autoClicker: { owned: 0, baseCost: 20, cps: 1 },
    ponteiroPro: { owned: 0, baseCost: 100, cps: 5 },
  },
};

function App() {
  const [gameState, setGameState] = useState(initialGameState);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // começa fechada
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [minigamesState, setMinigamesState] = useState({
    reactionGame: {
      isOpen: false,
      position: { x: 150, y: 150 },
    },
  });

  const openMinigame = (gameId) => {
    setMinigamesState(prev => ({...prev, [gameId]: { ...prev[gameId], isOpen: true }}));
  };

  const closeMinigame = (gameId) => {
    setMinigamesState(prev => ({
      ...prev,
      [gameId]: { ...prev[gameId], isOpen: false }
    }));
  };
  
  const updateMinigamePosition = (gameId, newPosition) => {
    setMinigamesState(prev => ({
      ...prev,
      [gameId]: { ...prev[gameId], position: newPosition }
    }));
  };

  const handleGameEnd = (minigameScore) => {
    const reward = minigameScore * 1000;
    if (reward > 0) {
      setGameState(prev => ({ ...prev, score: prev.score + reward }));
    }
  };

  const cursorCount = gameState.buildings.autoClicker.owned;

  const recalculateCPS = useCallback(() => {
    let totalCPS = 0;
    for (const buildingId in gameState.buildings) {
      const building = gameState.buildings[buildingId];
      totalCPS += building.owned * building.cps;
    }
    setGameState(prev => ({ ...prev, cps: totalCPS }));
  }, [gameState.buildings]);

   // CHEAT 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'c') {
        setGameState(prev => ({
          ...prev,
          score: prev.score + 5000
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

  // Loop Game 
  useEffect(() => {
    const gameInterval = setInterval(() => {
      setGameState(prev => ({ ...prev, score: prev.score + prev.cps }));
    }, 1000);
    return () => clearInterval(gameInterval);
  }, [gameState.cps]); 

  useEffect(() => {
    recalculateCPS();
  }, [gameState.buildings, recalculateCPS]);

  // Verifica se há novos upgrades disponíveis
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
    let pointsToAdd = gameState.clickValue;
    let isCritical = false;
    
    if (gameState.upgrades.criticalClicks.purchased) {
      if (Math.random() < 0.1) {
        isCritical = true;
        pointsToAdd *= 2.7; 
      }
    }

    setGameState(prev => ({ ...prev, score: prev.score + pointsToAdd }));
    
    if (gameState.upgrades.unlockSounds?.purchased) {
      playSound('click');
    }
    
    if (gameState.upgrades.floatingNumbers.purchased) {
      const newFloatingNumber = {
        id: Date.now() + Math.random(), 
        value: `+${Math.floor(pointsToAdd)}`,
        x: event.clientX,
        y: event.clientY,
        isCritical: isCritical,
      };
      
    setFloatingNumbers(prev => [...prev, newFloatingNumber]);

    setTimeout(() => {
      setFloatingNumbers(current => current.filter(n => n.id !== newFloatingNumber.id));
    }, 1500);
  }
  };

  // Função para comprar upgrades e aplicar efeitos
  const purchaseUpgrade = (upgradeId) => {
    const upgradeInfo = upgradesData[upgradeId]; 
    const upgradeStatus = gameState.upgrades[upgradeId];

    if (gameState.score >= upgradeInfo.cost && !upgradeStatus.purchased) {
      if (gameState.upgrades.unlockSounds?.purchased) {
        playSound('purchase');
      }

      setGameState(prev => ({...prev, score: prev.score - upgradeInfo.cost, upgrades: { ...prev.upgrades, [upgradeId]: { ...upgradeStatus, purchased: true },},
    }));

      if (upgradeInfo.applyEffect) {
        setGameState(prev => upgradeInfo.applyEffect(prev));
      }
    }
  };

  // Função para comprar construções
  const purchaseBuilding = (buildingId) => {
    const building = gameState.buildings[buildingId];
    const currentCost = Math.ceil(building.baseCost * Math.pow(1.15, building.owned));
    if (gameState.score >= currentCost) {
      if (gameState.upgrades.unlockSounds?.purchased) {
        playSound('purchase');
      }
      setGameState(prev => ({...prev, score: prev.score - currentCost, buildings: { ...prev.buildings, [buildingId]: { ...building, owned: building.owned + 1 }, },
    }));
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleReactionGameEnd = (minigameScore) => {
    // Define a recompensa: 1000 pontos base por cada bug clicado
    const reward = minigameScore * 1000; 

    if (reward > 0) {
      setGameState(prev => ({...prev,score: prev.score + reward}));
      // Opcional: Adicionar um som de recompensa aqui!
    }
  };

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
        <div key={num.id} className={`floating-number ${num.isCritical ? 'critical' : ''}`} style={{ left: `${num.x - 10}px`, top: `${num.y - 30}px`}}>
          {num.value}
        </div>
      ))}

      {/* Language */}
      {gameState.upgrades.unlockLanguages?.purchased && <LanguageSwitcher />}

      {gameState.upgrades.spinningCursors.purchased && (
        <SpinningCursors cursorCount={cursorCount} isSidebarOpen={isSidebarOpen} />
      )}


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
    
      {gameState.upgrades.unlockFooter.purchased && <Footer />}

      <MinigameIcon onClick={() => openMinigame('reactionGame')} />

      {Object.keys(minigamesState).map(gameId => {
        const gameState = minigamesState[gameId];
        const gameData = minigamesData[gameId];

        if (!gameState.isOpen) return null;

        return (
          <MinigameWindow
            key={gameId} 
            title={gameData.title}
            position={gameState.position}
            onClose={() => closeMinigame(gameId)}
            onPositionChange={(newPos) => updateMinigamePosition(gameId, newPos)}>
            <gameData.Component 
              onGameEnd={handleGameEnd} 
              onClose={() => closeMinigame(gameId)} 
            />
          </MinigameWindow>
        );
      })}
    </div>
  );
}

export default App;