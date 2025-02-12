"use client";

import { useCallback, useEffect } from "react";
import { useSound } from "@/lib/useSound";
import type { GamePageProps } from "@/lib/types";
import { ImagePreloader } from "@/components/ui/imagePreloader";
import { GAME_CONFIG, ASSETS } from "@/lib/constants";
import { useGameState } from "@/lib/useGameState";
import { useIconShuffle } from "@/lib/useIconShuffle";
import { useInactivityTimer } from "@/lib/useInactivityTimer";
import { GameGrid } from "./game/GameGrid";
import { GameInstructions } from "./game/GameInstructions";
import { GameStats } from "./game/GameStats";
import { InactivityWarning } from "./game/InactivityWarning";

export default function GamePage({ onEnd }: GamePageProps) {
  const {
    score,
    lives,
    shuffleInterval,
    gridFlash,
    speedFlash,
    updateScore,
    decreaseLives,
    decreaseInterval,
  } = useGameState();

  const { icons, shuffleIcons, cleanup, canTap } =
    useIconShuffle(shuffleInterval);
  const { playScore, playWrong } = useSound();

  const handleTimeout = useCallback(() => onEnd(score), [onEnd, score]);
  const { showWarning, resetTimer } = useInactivityTimer(handleTimeout);

  useEffect(() => {
    shuffleIcons();
    const intervalDecreaseTimer = setInterval(
      () => decreaseInterval(),
      GAME_CONFIG.INTERVAL_DECREASE_TIME
    );

    return () => {
      cleanup();
      clearInterval(intervalDecreaseTimer);
    };
  }, [shuffleIcons, decreaseInterval, cleanup]);

  useEffect(() => {
    if (score >= GAME_CONFIG.MAX_SCORE || lives <= 0) {
      onEnd(score);
    }
  }, [score, lives, onEnd]);

  const handleIconClick = (icon: string) => {
    if (!canTap()) {
      return false;
    }

    resetTimer();

    if (icon === ASSETS.TARGET_ICON) {
      updateScore();
      playScore();
    } else {
      decreaseLives();
      playWrong();
    }
    return true;
  };

  return (
    <div className="grid place-content-center w-auto p-6 portrait:max-w-[25rem] portrait:h-dvh landscape:flex landscape:max-w-full landscape:justify-around gap-4 overflow-hidden">
      <ImagePreloader />
      {showWarning && <InactivityWarning onContinue={resetTimer} />}
      {/* Controls Section */}
      <div className="landscape:my-auto">
        <GameInstructions onQuit={() => onEnd(score)} />
        <GameStats
          score={score}
          lives={lives}
          shuffleInterval={shuffleInterval}
          speedFlash={speedFlash}
        />
      </div>
      {/* Game Grid Section */}
      <div className="h-full flex items-center">
        <div className="w-full h-auto max-h-full aspect-square">
          <GameGrid
            icons={icons}
            gridFlash={gridFlash}
            onIconClick={handleIconClick}
            canTap={canTap()}
          />
        </div>
      </div>
    </div>
  );
}
