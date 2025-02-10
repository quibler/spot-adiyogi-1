import { useState, useCallback } from "react";
import { GAME_CONFIG } from "./constants";
import { GridFlashState } from "./types";

export function useGameState() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState<number>(GAME_CONFIG.MAX_LIVES);
  const [shuffleInterval, setShuffleInterval] = useState<number>(
    GAME_CONFIG.INITIAL_SHUFFLE_INTERVAL
  );
  const [gridFlash, setGridFlash] = useState<GridFlashState>(null);
  const [speedFlash, setSpeedFlash] = useState(false);
  const [wrongTaps, setWrongTaps] = useState<number[]>([]);
  const [correctTaps, setCorrectTaps] = useState<number[]>([]);

  const decreaseInterval = useCallback(() => {
    setShuffleInterval((prev) => prev * (1 - GAME_CONFIG.INTERVAL_DECREASE));
    setSpeedFlash(true);
    setTimeout(() => setSpeedFlash(false), GAME_CONFIG.SPEED_FLASH_DURATION);
  }, []);

  const updateScore = useCallback(() => {
    const newScore = Math.min(score + 1, GAME_CONFIG.MAX_SCORE);
    setScore(newScore);
    setCorrectTaps((prev) => [...prev, score]); // Add current score before increment
    setGridFlash("correct");
    setTimeout(() => setGridFlash(null), GAME_CONFIG.FLASH_DURATION);
  }, [score]);

  const decreaseLives = useCallback(() => {
    setLives((prev) => prev - 1);
    setWrongTaps((prev) => [...prev, score]); // Add current score position as wrong tap
    setGridFlash("wrong");
    setTimeout(() => setGridFlash(null), GAME_CONFIG.FLASH_DURATION);
    decreaseInterval();
  }, [score, decreaseInterval]);

  return {
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
  };
}
