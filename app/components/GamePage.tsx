"use client";

import { useEffect } from "react";
import { useSound } from "@/lib/useSound";
import type { GamePageProps } from "@/lib/types";
import { ImagePreloader } from "@/components/ui/imagePreloader";
import { GAME_CONFIG, ASSETS } from "@/lib/constants";
import { useGameState } from "@/lib/useGameState";
import { useIconShuffle } from "@/lib/useIconShuffle";
import { GameGrid } from "./game/GameGrid";
import { GameInstructions } from "./game/GameInstructions";
import { GameProgress } from "./game/GameProgress";
import { GameStats } from "./game/GameStats";

export default function GamePage({ onEnd }: GamePageProps) {
  const {
    score,
    lives,
    shuffleInterval,
    gridFlash,
    speedFlash,
    wrongTaps,
    correctTaps,
    updateScore,
    decreaseLives,
    decreaseInterval,
  } = useGameState();

  const { icons, shuffleIcons, cleanup, canTap } =
    useIconShuffle(shuffleInterval);
  const { playScore, playWrong } = useSound();

  useEffect(() => {
    shuffleIcons(); // Initial shuffle
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
    <div className="text-center max-w-2xl mx-auto px-4">
      <ImagePreloader />
      <GameInstructions />
      <GameStats
        score={score}
        lives={lives}
        shuffleInterval={shuffleInterval}
        speedFlash={speedFlash}
        onQuit={() => onEnd(score)}
      />
      <GameProgress
        score={score}
        targetPoints={GAME_CONFIG.TARGET_POINTS}
        wrongTaps={wrongTaps}
        correctTaps={correctTaps}
      />
      <GameGrid
        icons={icons}
        gridFlash={gridFlash}
        onIconClick={handleIconClick}
        canTap={canTap()}
        shuffleInterval={shuffleInterval}
      />
    </div>
  );
}
