"use client"

import { useState } from "react"
import StartPage from "./components/StartPage"
import GamePage from "./components/GamePage"
import EndPage from "./components/EndPage"
import VictoryPage from "./components/VictoryPage"

export default function Home() {
  const [gameState, setGameState] = useState<"start" | "game" | "end" | "victory">("start")
  const [score, setScore] = useState(0)

  const startGame = () => setGameState("game")
  const endGame = (finalScore: number) => {
    setScore(finalScore)
    setGameState(finalScore >= 50 ? "victory" : "end")
  }
  const restartGame = () => setGameState("start")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      {gameState === "start" && <StartPage onStart={startGame} />}
      {gameState === "game" && <GamePage onEnd={endGame} />}
      {gameState === "end" && <EndPage score={score} onRestart={restartGame} />}
      {gameState === "victory" && <VictoryPage score={score} onRestart={restartGame} />}
    </main>
  )
}

