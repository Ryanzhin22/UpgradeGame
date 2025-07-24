export const upgradesData = {
  branding: {
    id: 'branding',
    nameKey: 'upgrade_branding_name',
    descriptionKey: 'upgrade_branding_desc',
    cost: 10,
    requiredScore: 0,
    applyEffect: (gameState) => {
      document.title = 'Upgrade Everything!';
      const favicon = document.getElementById('favicon');
      if (favicon) {
        favicon.href = '/favicon.png';
      }
      return gameState;
    }
  },

  unlockBuildings: {
    id: 'unlockBuildings',
    nameKey: 'upgrade_unlockBuildings_name',
    descriptionKey: 'upgrade_unlockBuildings_desc',
    cost: 25,
    requiredScore: 0,
  },
  floatingNumbers: {
    id: 'floatingNumbers',
    nameKey: 'upgrade_floatingNumbers_name',
    descriptionKey: 'upgrade_floatingNumbers_desc',
    cost: 70,
    requiredScore: 35,
  },
  fancyButton: {
    id: 'fancyButton',
    nameKey: 'upgrade_fancyButton_name',
    descriptionKey: 'upgrade_fancyButton_desc',
    cost: 100, 
    requiredScore: 0,
  },
  strongerClicks1: {
    id: 'strongerClicks1',
    nameKey: 'upgrade_strongerClicks1_name',
    descriptionKey: 'upgrade_strongerClicks1_desc',
    cost: 150,
    requiredScore: 70,
    applyEffect: (gameState) => {
      return { ...gameState, clickValue: gameState.clickValue + 4 };
    }
  },
  spinningCursors: {
    id: 'spinningCursors',
    nameKey: 'upgrade_spinningCursors_name',
    descriptionKey: 'upgrade_spinningCursors_desc',
    cost: 175,
    requiredScore: 80,
  },
  fancyShopItems: {
    id: 'fancyShopItems',
    nameKey: 'upgrade_fancyShopItems_name',
    descriptionKey: 'upgrade_fancyShopItems_desc',
    cost: 250, 
    requiredScore: 150,
  },
  unlockSounds: {
    id: 'unlockSounds',
    nameKey: 'upgrade_unlockSounds_name',
    descriptionKey: 'upgrade_unlockSounds_desc',
    cost: 255,
    requiredScore: 190,
  },
  unlockLanguages: {
    id: 'unlockLanguages',
    nameKey: 'upgrade_unlockLanguages_name',
    descriptionKey: 'upgrade_unlockLanguages_desc',
    cost: 500, 
    requiredScore: 200,
  },
  unlockFooter: {
    id: 'unlockFooter',
    nameKey: 'upgrade_unlockFooter_name',
    descriptionKey: 'upgrade_unlockFooter_desc',
    cost: 600,
    requiredScore: 300,
  },
  upgradeFooter: {
    id: 'upgradeFooter',
    nameKey: 'upgrade_upgradeFooter_name',
    descriptionKey: 'upgrade_upgradeFooter_desc',
    cost: 600,
    requiredScore: 600,
  },
  strongerClicks2: {
    id: 'strongerClicks2',
    nameKey: 'upgrade_strongerClicks2_name',
    descriptionKey: 'upgrade_strongerClicks2_desc',
    cost: 1500,
    requiredScore: 500,
    applyEffect: (gameState) => {
      return { ...gameState, clickValue: gameState.clickValue + 10 };
    }
  },
  criticalClicks: {
    id: 'criticalClicks',
    nameKey: 'upgrade_criticalClicks_name',
    descriptionKey: 'upgrade_criticalClicks_desc',
    cost: 2500,
    requiredScore: 1000,
  },
  gameBackground: {
    id: 'gameBackground',
    nameKey: 'upgrade_gameBackground_name',
    descriptionKey: 'upgrade_gameBackground_desc',
    cost: 3555,
    requiredScore: 2000,
    applyEffect: (gameState) => {
      document.body.classList.add('background-active');
      return gameState;
    }
  },
  unlockMinigame1:{
    id: 'unlockMinigame1',
    nameKey: 'upgrade_unlockMinigame1_name',
    descriptionKey: 'upgrade_unlockMinigame1_desc',
    cost: 4500,
    requiredScore: 2550,
  },
  unlockStats: {
    id: 'unlockStats',
    nameKey: 'upgrade_unlockStats_name',
    descriptionKey: 'upgrade_unlockStats_desc',
    cost: 6666,
    requiredScore: 4000,
  },
  unlockAchievements: {
    id: 'unlockAchievements',
    nameKey: 'upgrade_unlockAchievements_name',
    descriptionKey: 'upgrade_unlockAchievements_desc',
    cost: 8000,
    requiredScore: 4500,
  },
  unlockBuffs: {
    id: 'unlockBuffs',
    nameKey: 'upgrade_unlockBuffs_name',
    descriptionKey: 'upgrade_unlockBuffs_desc',
    cost: 10000,
    requiredScore: 5000,
  },
  strongerAutoClickers: {
    id: 'strongerAutoClickers',
    nameKey: 'upgrade_strongerAutoClickers_name',
    descriptionKey: 'upgrade_strongerAutoClickers_desc',
    cost: 10000,
    requiredScore: 5000,
    applyEffect: (gameState) => {
      const newBuildings = { ...gameState.buildings };
      newBuildings.autoClicker.multiplier = 4;
      return { ...gameState, buildings: newBuildings };
    }
  },
  unlockChests: {
    id: 'unlockChests',
    nameKey: 'upgrade_unlockChests_name',
    descriptionKey: 'upgrade_unlockChests_desc',
    cost: 25000,
    requiredScore: 7500,
  },
  
  
};