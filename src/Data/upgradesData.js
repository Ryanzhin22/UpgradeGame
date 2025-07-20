export const upgradesData = {
  unlockBuildings: {
    id: 'unlockBuildings',
    nameKey: 'upgrade_unlockBuildings_name',
    descriptionKey: 'upgrade_unlockBuildings_desc',
    cost: 50,
    requiredScore: 0,
  },
  floatingNumbers: {
    id: 'floatingNumbers',
    nameKey: 'upgrade_floatingNumbers_name',
    descriptionKey: 'upgrade_floatingNumbers_desc',
    cost: 150,
    requiredScore: 50,
  },
  fancyButton: {
    id: 'fancyButton',
    nameKey: 'upgrade_fancyButton_name',
    descriptionKey: 'upgrade_fancyButton_desc',
    cost: 250, 
    requiredScore: 0,
  },
  strongerClicks1: {
    id: 'strongerClicks1',
    nameKey: 'upgrade_strongerClicks1_name',
    descriptionKey: 'upgrade_strongerClicks1_desc',
    cost: 300,
    requiredScore: 200,
    applyEffect: (gameState) => {
      return { ...gameState, clickValue: gameState.clickValue + 1 };
    }
  },
  fancyShopItems: {
    id: 'fancyShopItems',
    nameKey: 'upgrade_fancyShopItems_name',
    descriptionKey: 'upgrade_fancyShopItems_desc',
    cost: 500, 
    requiredScore: 200,
  },
  unlockLanguages: {
    id: 'unlockLanguages',
    nameKey: 'upgrade_unlockLanguages_name',
    descriptionKey: 'upgrade_unlockLanguages_desc',
    cost: 1000, 
    requiredScore: 350,
  },
};