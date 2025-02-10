import { useState, useCallback, useRef } from "react";
import { GAME_CONFIG, ASSETS } from "./constants";

export function useIconShuffle(shuffleInterval: number) {
  const [icons, setIcons] = useState<string[]>([]);
  const shuffleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastShuffleTimeRef = useRef<number>(0);
  const iconsRef = useRef<string[]>([]);

  const shuffleIcons = useCallback(() => {
    const currentTime = Date.now();
    lastShuffleTimeRef.current = currentTime;

    const shuffledIcons = [...ASSETS.DUMMY_ICONS, ASSETS.TARGET_ICON]
      .sort(() => Math.random() - 0.5)
      .slice(0, GAME_CONFIG.GRID_SIZE * GAME_CONFIG.GRID_SIZE);

    iconsRef.current = shuffledIcons;
    setIcons(shuffledIcons);

    if (shuffleTimeoutRef.current) {
      clearTimeout(shuffleTimeoutRef.current);
    }
    shuffleTimeoutRef.current = setTimeout(shuffleIcons, shuffleInterval);
  }, [shuffleInterval]);

  const canTap = useCallback(() => {
    const timeSinceShuffle = Date.now() - lastShuffleTimeRef.current;
    return timeSinceShuffle >= 0 && timeSinceShuffle < shuffleInterval;
  }, [shuffleInterval]);

  const cleanup = useCallback(() => {
    if (shuffleTimeoutRef.current) {
      clearTimeout(shuffleTimeoutRef.current);
    }
  }, []);

  return { icons, shuffleIcons, cleanup, canTap, lastShuffleTimeRef };
}
