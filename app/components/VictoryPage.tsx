"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface VictoryPageProps {
  score: number
  onRestart: () => void
}

export default function VictoryPage({ score, onRestart }: VictoryPageProps) {
  const [rewardClaimed, setRewardClaimed] = useState(false)
  const shareMessage = `I scored ${score} in Spot Adiyogi! Can you beat my score? Play now and win exclusive Sadhguru content!`

  const claimReward = () => {
    // Implement reward claiming logic here
    setRewardClaimed(true)
  }

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`
    window.open(url, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
      <p className="text-xl mb-4">Your score: {score}</p>
      <div className="bg-yellow-400 text-black p-4 rounded-lg mb-6">
        <h3 className="text-2xl font-bold mb-2">You&apos;ve Won!</h3>
        <p className="mb-2">Exclusive Sadhguru content unlocked!</p>
        <p className="text-sm text-red-600 font-bold">Limited Time Offer - Claim Now!</p>
      </div>
      {!rewardClaimed ? (
        <Button onClick={claimReward} className="w-full mb-4 bg-green-500 hover:bg-green-600">
          Claim Your Reward
        </Button>
      ) : (
        <p className="text-green-400 mb-4">Reward Claimed!</p>
      )}
      <Button onClick={shareOnWhatsApp} className="w-full mb-4 bg-green-600 hover:bg-green-700">
        Invite Friends to Play
      </Button>
      <Button onClick={onRestart} className="w-full bg-blue-500 hover:bg-blue-600">
        Play Again
      </Button>
    </motion.div>
  )
}

