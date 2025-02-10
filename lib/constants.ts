// Game Configuration
export const GAME_CONFIG = {
  GRID_SIZE: 5,
  INITIAL_SHUFFLE_INTERVAL: 1000, // 1 second to start
  INTERVAL_DECREASE: 0.05, // 5% decrease
  INTERVAL_DECREASE_TIME: 10000, // 10 seconds
  MAX_LIVES: 5,
  MAX_SCORE: 108,
  TARGET_POINTS: 50, // Points needed to win
  FLASH_DURATION: 200, // Duration of grid flash animation
  SPEED_FLASH_DURATION: 500, // Duration of speed flash animation
} as const;

// Asset Paths
export const ASSETS = {
  DUMMY_ICONS: Array.from({ length: 24 }, (_, i) => `icons/${i + 1}.png`),
  TARGET_ICON: "icons/adiyogi-icon.png",
  SOUNDS: {
    SCORE: "/sounds/score.mp3",
    WRONG: "/sounds/wrong.mp3",
  },
} as const;

export const calculateSpeedMultiplier = (currentInterval: number): number => {
  return Number(
    (GAME_CONFIG.INITIAL_SHUFFLE_INTERVAL / currentInterval).toFixed(1)
  );
};
