import React, { useState, useEffect, useRef, useCallback } from 'react';
import { upgradesData } from './Data/upgradesData.js';
import { minigamesData } from './Data/minigamesData.js';
import { playSound } from './utils/audioManager';
import { achievementsData } from './Data/achievementsData.js';
import Sidebar from './components/Sidebar.jsx';
import MainContent from './components/MainContent.jsx';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer.jsx';
import SpinningCursors from './components/SpinningCursors.jsx';
import MinigameIcon from './components/MinigameIcon.jsx';
import MinigameWindow from './components/MinigameWindow.jsx';
import StatsIcon from './components/StatsIcon.jsx';
import StatsModal from './components/StatsModal.jsx';
import AchievementsIcon from './components/AchievementsIcon.jsx';
import AchievementsModal from './components/AchievementsModal.jsx';
import BuffsPanel from './components/BuffsPanel.jsx';
import GoldenChest from './components/GoldenChest.jsx';
import './styles/App.css';

const getInitialAchievements = () => {
  const achievements = {};
  for (const achId in achievementsData) {
    achievements[achId] = false; // Todas começam como 'false' (bloqueadas)
  }
  return achievements;
};

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
    upgradeFooter: { purchased: false, unlocked: false },
    unlockMinigame1: { purchased: false, unlocked: false },
    unlockStats: { purchased: false, unlocked: false },
    unlockAchievements: { purchased: false, unlocked: false },
    unlockBuffs: { purchased: false, unlocked: false },
    strongerAutoClickers: { purchased: false, unlocked: false },
    unlockChests: { purchased: false, unlocked: false },
  },
  buildings: {
    autoClicker: { owned: 0, baseCost: 20, cps: 1, multiplier: 1 },
    ponteiroPro: { owned: 0, baseCost: 100, cps: 5, multiplier: 1 },
  },
  stats: {
    totalClicks: 0,
    pointsFromClicks: 0,
    pointsFromMinigames: 0,
    pointsFromBuildings: {
      autoClicker: 0,
      ponteiroPro: 0,
    },
  },
  achievements: getInitialAchievements(),
  buffs: {
    clickFrenzy: { activeUntil: 0, power: 2 }, 
    cpsBoost: { activeUntil: 0, power: 1.5 }, 
    criticalLuck: { activeUntil: 0, power: 0.5 }, 
  },
};

function App() {
  const [gameState, setGameState] = useState(initialGameState);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [goldenChest, setGoldenChest] = useState({ isVisible: false, top: 0, left: 0 });
  const chestTimeoutRef = useRef(null)
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

  const handleGameEnd = (minigameScore, difficulty) => {
    let rewardMultiplier = 1; 

    switch (difficulty) {
      case 'facil':
        rewardMultiplier = 100; 
        break;
      case 'medio':
        rewardMultiplier = 250; 
        break;
      case 'dificil':
        rewardMultiplier = 1250; 
        break;
      default:
        rewardMultiplier = 1000;
    }

    const reward = minigameScore * rewardMultiplier;

    if (reward > 0) {
      setGameState(prev => ({ ...prev,
        score: prev.score + reward,
        stats: { ...prev.stats,
          pointsFromMinigames: prev.stats.pointsFromMinigames + reward,
        },
      }));
    }
  };

  const cursorCount = gameState.buildings.autoClicker.owned;

  // Buff Management
    useEffect(() => {
    const buffInterval = setInterval(() => {
      let needsUpdate = false;
      const now = Date.now();
      
      for (const buffId in gameState.buffs) {
        const buff = gameState.buffs[buffId];
        
        if (buff.activeUntil > 0 && buff.activeUntil < now) {
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        setGameState(prev => ({ ...prev }));
      }
    }, 1000);

    return () => clearInterval(buffInterval);
  }, [gameState.buffs]); 


  // Buff Activation
  const activateBuff = (buffId, chargedSeconds) => {
    const durationMs = chargedSeconds * 1000;
    setGameState(prev => ({
      ...prev,
      buffs: {
        ...prev.buffs,
        [buffId]: {
          ...prev.buffs[buffId],
          activeUntil: Date.now() + durationMs,
        },
      },
    }));
  };

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

  // CHESTS
const scheduleNextChest = useCallback(() => {
    clearTimeout(chestTimeoutRef.current); 
  
    const interval = Math.floor(Math.random() * 30000) + 60000;

    chestTimeoutRef.current = setTimeout(() => {
      const top = Math.random() * 80 + 10 + '%'; 
      const left = Math.random() * 80 + 10 + '%';
      setGoldenChest({ isVisible: true, top, left });

      chestTimeoutRef.current = setTimeout(() => {
        setGoldenChest(prev => ({ ...prev, isVisible: false }));
        scheduleNextChest(); 
      }, 8000);
    }, interval);
  }, [gameState.upgrades.unlockChests.purchased]); 


  useEffect(() => {
    if (gameState.upgrades.unlockChests.purchased) {
      scheduleNextChest();
    }
    return () => clearTimeout(chestTimeoutRef.current);
  }, [gameState.upgrades.unlockChests.purchased, scheduleNextChest]); 


  const handleGoldenChestClick = () => {
    if (!goldenChest.isVisible) return;
    
    const reward = (gameState.cps * 60) + 13;
    setGameState(prev => ({
      ...prev,
      score: prev.score + reward,
    }));

    const newFloatingNumber = {
      id: Date.now() + Math.random(),
      value: `+${Math.floor(reward).toLocaleString()}`,
      x: parseInt(goldenChest.left, 10) * window.innerWidth / 100, 
      y: parseInt(goldenChest.top, 10) * window.innerHeight / 100,
      isCritical: true, 
    };
    setFloatingNumbers(prev => [...prev, newFloatingNumber]);
    setTimeout(() => {
      setFloatingNumbers(current => current.filter(n => n.id !== newFloatingNumber.id));
    }, 1500);

    setGoldenChest({ isVisible: false, top: 0, left: 0 });
    clearTimeout(chestTimeoutRef.current);
    scheduleNextChest();
  };

  // Achievements
  useEffect(() => {
    const newAchievements = {};
    for (const achId in achievementsData) {
      if (!gameState.achievements[achId] && achievementsData[achId].condition(gameState)) {
        newAchievements[achId] = true;
      }
    }

    if (Object.keys(newAchievements).length > 0) {
      setGameState(prev => ({...prev, achievements: { ...prev.achievements, ...newAchievements, },
    }));
      // Opcional: Adicionar um som de "conquista desbloqueada"!
    }
  }, [gameState])

  // Loop Game 
  useEffect(() => {
    const gameInterval = setInterval(() => {
      setGameState(prev => {
        let baseCPS = 0;
        const newPointsFromBuildings = { ...prev.stats.pointsFromBuildings };
        for (const buildingId in prev.buildings) {
          const building = prev.buildings[buildingId];
          const productionThisSecond = building.owned * (building.cps * building.multiplier);
          baseCPS += productionThisSecond;
          newPointsFromBuildings[buildingId] = (newPointsFromBuildings[buildingId] || 0) + productionThisSecond;
        }

        let finalCPS = baseCPS;
        if (prev.buffs.cpsBoost.activeUntil > Date.now()) {
          finalCPS *= prev.buffs.cpsBoost.power;
        }

        return {
          ...prev,
          score: prev.score + finalCPS, // Adiciona os pontos corretos (com ou sem buff)
          cps: finalCPS,               // ATUALIZA O DISPLAY com o valor correto
          stats: {
            ...prev.stats,
            pointsFromBuildings: newPointsFromBuildings,
          },
        };
      });
    }, 1000);

    // Limpeza do intervalo
    return () => clearInterval(gameInterval);
  }, []);

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
    let criticalChance = 0.1; 

    if (gameState.buffs.criticalLuck.activeUntil > Date.now()) {
      criticalChance = gameState.buffs.criticalLuck.power; // 50%
    }
    
    if (gameState.buffs.clickFrenzy.activeUntil > Date.now()) {
      pointsToAdd *= gameState.buffs.clickFrenzy.power;
    }

    if (gameState.upgrades.criticalClicks.purchased && Math.random() < criticalChance) {
      isCritical = true;
      pointsToAdd *= 2.7;
    }

    setGameState(prev => ({ ...prev, score: prev.score + pointsToAdd,
      stats: { 
        ...prev.stats,
        totalClicks: prev.stats.totalClicks + 1,
        pointsFromClicks: prev.stats.pointsFromClicks + pointsToAdd,
      },
    }));
    
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

      {gameState.upgrades.unlockStats.purchased && (
        <StatsIcon onClick={() => setIsStatsModalOpen(true)} />
      )}
      {isStatsModalOpen && (
        <StatsModal stats={gameState.stats} onClose={() => setIsStatsModalOpen(false)} />
      )}

      {gameState.upgrades.unlockAchievements.purchased && (
        <AchievementsIcon onClick={() => setIsAchievementsModalOpen(true)} />
      )}
      {isAchievementsModalOpen && (
        <AchievementsModal unlockedAchievements={gameState.achievements} onClose={() => setIsAchievementsModalOpen(false)} />
      )}

      {gameState.upgrades.spinningCursors.purchased && (
        <SpinningCursors cursorCount={cursorCount} isSidebarOpen={isSidebarOpen} />
      )}

      {gameState.upgrades.unlockBuffs.purchased && (
        <BuffsPanel gameState={gameState} activateBuff={activateBuff} />
      )}

      {goldenChest.isVisible && (
        <GoldenChest
          position={{ top: goldenChest.top, left: goldenChest.left }}
          onClick={handleGoldenChestClick}
        />
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
    
      {gameState.upgrades.unlockFooter.purchased && (
        <Footer isUpgraded={gameState.upgrades.upgradeFooter.purchased} />
      )}

      {gameState.upgrades.unlockMinigame1.purchased && (
        <MinigameIcon onClick={() => openMinigame('reactionGame')} />
      )}

      {Object.keys(minigamesState).map(gameId => {
        const gameState = minigamesState[gameId];
        const gameData = minigamesData[gameId];

        if (!gameState.isOpen) return null;

        return (
          <MinigameWindow
            key={gameId}
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