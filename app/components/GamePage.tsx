"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSound } from "@/lib/useSound";
import type { GamePageProps } from "@/lib/types";
import { ImagePreloader } from "@/components/imagePreloader";
import { GAME_CONFIG, ASSETS } from "@/lib/constants";
import { useGameState } from "@/lib/useGameState";
import { useIconShuffle } from "@/lib/useIconShuffle";
import { useInactivityTimer } from "@/lib/useInactivityTimer";
import { GameGrid } from "./game/GameGrid";
import { GameInstructions } from "./game/GameInstructions";
import { GameStats } from "./game/GameStats";
import { InactivityWarning } from "./game/InactivityWarning";
import { useTracking } from "@/lib/mixpanel";

const getMedal = (score: number) => {
  const MEDALS = [
    { threshold: 250, name: "Mythic" },
    { threshold: 150, name: "Legendary" },
    { threshold: 100, name: "Platinum" },
    { threshold: 80, name: "Diamond" },
    { threshold: 60, name: "Gold" },
    { threshold: 40, name: "Silver" },
    { threshold: 20, name: "Bronze" },
  ];
  return MEDALS.find((medal) => score >= medal.threshold)?.name || "None";
};

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

  const startTime = useRef(Date.now());
  const tracking = useTracking();

  const { icons, shuffleIcons, cleanup, canTap } =
    useIconShuffle(shuffleInterval);
  const { playScore, playWrong } = useSound();

  // Handle timeout completion
  const handleTimeout = useCallback(() => {
    const duration = Math.floor((Date.now() - startTime.current) / 1000);
    tracking.trackGameCompleted({
      score,
      duration,
      completed_type: "timeout",
      medal: getMedal(score),
    });
    onEnd(score);
  }, [onEnd, score, tracking]);

  const { showWarning, resetTimer } = useInactivityTimer(handleTimeout);

  // Handle quit completion
  const handleQuit = useCallback(() => {
    const duration = Math.floor((Date.now() - startTime.current) / 1000);
    tracking.trackGameCompleted({
      score,
      duration,
      completed_type: "quit",
      medal: getMedal(score),
    });
    onEnd(score);
  }, [onEnd, score, tracking]);

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

  // Handle game over completion (max score or no lives)
  useEffect(() => {
    if (score >= GAME_CONFIG.MAX_SCORE || lives <= 0) {
      const duration = Math.floor((Date.now() - startTime.current) / 1000);
      tracking.trackGameCompleted({
        score,
        duration,
        completed_type: "game_over",
        medal: getMedal(score),
      });
      onEnd(score);
    }
  }, [score, lives, tracking, onEnd]);

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
        <GameInstructions onQuit={handleQuit} />
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
