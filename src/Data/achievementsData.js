import { FaMousePointer, FaPlus, FaBuilding, FaBug } from 'react-icons/fa';

export const achievementsData = {
  click1: {
    nameKey: 'ach_click1_name',
    descKey: 'ach_click1_desc',
    IconComponent: FaMousePointer,
    condition: (gameState) => gameState.stats.totalClicks >= 1,
  },
  click100: {
    nameKey: 'ach_click100_name',
    descKey: 'ach_click100_desc',
    IconComponent: FaMousePointer,
    condition: (gameState) => gameState.stats.totalClicks >= 100,
  },
  build1: {
    nameKey: 'ach_build1_name',
    descKey: 'ach_build1_desc',
    IconComponent: FaBuilding,
    condition: (gameState) => gameState.buildings.autoClicker.owned >= 1,
  },
  // Conquistas de Minigame
  minigame1: {
    nameKey: 'ach_minigame1_name',
    descKey: 'ach_minigame1_desc',
    IconComponent: FaBug,
    condition: (gameState) => gameState.stats.pointsFromMinigames > 0,
  },
};