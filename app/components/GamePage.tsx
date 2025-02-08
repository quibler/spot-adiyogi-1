"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useSound } from "@/lib/useSound";

interface GamePageProps {
  onEnd: (score: number) => void;
}

const GRID_SIZE = 5;
const INITIAL_SHUFFLE_INTERVAL = 1000; // 1 seconds to start
const INTERVAL_DECREASE = 0.05; // 5% decrease (more gradual difficulty increase)
const INTERVAL_DECREASE_TIME = 10000; // 10 seconds
const MAX_LIVES = 5;
const MAX_SCORE = 108;
const TARGET_POINTS = 50; // Points needed to win

const DUMMY_ICONS = Array.from({ length: 24 }, (_, i) => `icons/${i + 1}.png`);
const TARGET_ICON = "icons/adiyogi-icon.png";

export default function GamePage({ onEnd }: GamePageProps) {
  const [icons, setIcons] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [shuffleInterval, setShuffleInterval] = useState(
    INITIAL_SHUFFLE_INTERVAL
  );
  const [canTap] = useState(true);
  const [gridFlash, setGridFlash] = useState<"correct" | "wrong" | null>(null);
  const [speedFlash, setSpeedFlash] = useState(false);
  const { playScore, playWrong } = useSound();
  const lastTapTimeRef = useRef(0);
  const shuffleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shuffleIcons = useCallback(() => {
    const shuffledIcons = [...DUMMY_ICONS, TARGET_ICON]
      .sort(() => Math.random() - 0.5)
      .slice(0, GRID_SIZE * GRID_SIZE);
    setIcons(shuffledIcons);

    if (shuffleTimeoutRef.current) {
      clearTimeout(shuffleTimeoutRef.current);
    }
    shuffleTimeoutRef.current = setTimeout(shuffleIcons, shuffleInterval);
  }, [shuffleInterval]);

  const decreaseInterval = useCallback(() => {
    setShuffleInterval(
      (prevInterval) => prevInterval * (1 - INTERVAL_DECREASE)
    );
    setSpeedFlash(true);
    setTimeout(() => setSpeedFlash(false), 500);
  }, []);

  useEffect(() => {
    shuffleIcons(); // Initial shuffle

    const intervalDecreaseTimer = setInterval(
      decreaseInterval,
      INTERVAL_DECREASE_TIME
    );

    return () => {
      if (shuffleTimeoutRef.current) {
        clearTimeout(shuffleTimeoutRef.current);
      }
      clearInterval(intervalDecreaseTimer);
    };
  }, [shuffleIcons, decreaseInterval]);

  useEffect(() => {
    if (score >= MAX_SCORE || lives <= 0) {
      onEnd(score);
    }
  }, [score, lives, onEnd]);

  const handleIconClick = (icon: string) => {
    const currentTime = Date.now();
    if (currentTime - lastTapTimeRef.current < shuffleInterval) {
      return false;
    }
    lastTapTimeRef.current = currentTime;

    if (icon === TARGET_ICON) {
      setScore((prev) => Math.min(prev + 1, MAX_SCORE));
      setGridFlash("correct");
      playScore();
    } else {
      setLives((prev) => prev - 1);
      decreaseInterval();
      setGridFlash("wrong");
      playWrong();
    }

    // Reset flash after animation
    setTimeout(() => setGridFlash(null), 200);
    return true;
  };

  return (
    <div className="text-center max-w-2xl mx-auto px-4">
      {/* Instructions Panel */}
      <div className="mb-8 bg-white/10 rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Spot Adiyogi</h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="relative">
            <img
              src={`/${TARGET_ICON}`}
              alt="Target Icon"
              className="w-16 h-16 border-2 border-yellow-400 rounded-lg"
            />
          </div>
          <div className="text-left">
            <p className="font-medium">Tap this icon as fast as you can!</p>
            <p className="text-sm opacity-75">
              Score {TARGET_POINTS} points to win exclusive content
            </p>
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-3xl font-bold mb-1">
            {score}/{TARGET_POINTS}
          </div>
          <div
            className={`text-sm transition-colors duration-200 ${
              speedFlash ? "text-red-500 font-bold" : "opacity-75"
            }`}
          >
            Speed: {Math.round(shuffleInterval)}ms
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex">
            {Array.from({ length: MAX_LIVES }).map((_, index) => (
              <Heart
                key={index}
                className={`w-6 h-6 ${
                  index < lives ? "text-red-500 fill-red-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => onEnd(score)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Quit Game"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Game Grid */}
      <div
        className={`grid grid-cols-5 gap-2 p-4 rounded-lg transition-colors duration-200 ${
          gridFlash === "correct"
            ? "bg-green-500/20"
            : gridFlash === "wrong"
            ? "bg-red-500/20"
            : "bg-white/10"
        }`}
      >
        {icons.map((icon, index) => (
          <motion.button
            key={`${icon}-${index}`}
            whileHover={canTap ? { scale: 1.05 } : undefined}
            whileTap={
              canTap && Date.now() - lastTapTimeRef.current >= shuffleInterval
                ? { scale: 0.95 }
                : undefined
            }
            onClick={() => {
              const isValidTap = handleIconClick(icon);
              if (!isValidTap) {
                return;
              }
            }}
            className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center shadow-lg"
          >
            <img
              src={`/${icon}`}
              alt={`icon-${index}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${(score / TARGET_POINTS) * 100}%` }}
        />
      </div>
    </div>
  );
}
