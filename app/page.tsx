"use client";

import { useState } from "react";
import StartPage from "./components/StartPage";
import GamePage from "./components/GamePage";
import EndPage from "./components/EndPage";
import { ParticlesBackground } from "./components/ParticlesBackground";

export default function Home() {
  const [gameState, setGameState] = useState<"start" | "game" | "end">("start");
  const [score, setScore] = useState(0);

  const startGame = () => setGameState("game");
  const endGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState("end");
  };
  const restartGame = () => setGameState("start");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 text-white relative">
      <ParticlesBackground />
      <div className="z-10">
        {gameState === "start" && <StartPage onStart={startGame} />}
        {gameState === "game" && <GamePage onEnd={endGame} />}
        {gameState === "end" && (
          <EndPage score={score} onRestart={restartGame} />
        )}
      </div>
    </main>
  );
}
