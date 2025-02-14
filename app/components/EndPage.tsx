"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, Sparkles, RotateCcw, Instagram } from "lucide-react";
import { useTracking } from "@/lib/mixpanel";

interface EndPageProps {
  score: number;
  onRestart: () => void;
}

const MEDALS = [
  {
    threshold: 100,
    name: "Diamond",
    emoji: "💎",
    color: "text-cyan-300",
    message: "Legendary! You've achieved the highest rank!",
  },
  {
    threshold: 80,
    name: "Platinum",
    emoji: "⚪",
    color: "text-slate-300",
    message: "Outstanding! You're among the elite players!",
  },
  {
    threshold: 60,
    name: "Gold",
    emoji: "🥇",
    color: "text-yellow-400",
    message: "Excellent! You've mastered the game!",
  },
  {
    threshold: 40,
    name: "Silver",
    emoji: "🥈",
    color: "text-gray-300",
    message: "Great job! Keep pushing higher!",
  },
  {
    threshold: 20,
    name: "Bronze",
    emoji: "🥉",
    color: "text-yellow-700",
    message: "Well done! You're off to a good start!",
  },
];

function getMedal(score: number) {
  return MEDALS.find((medal) => score >= medal.threshold) || null;
}

export default function EndPage({ score, onRestart }: EndPageProps) {
  const tracking = useTracking();
  const medal = getMedal(score);

  // "Challenge Friends" action - remains unchanged.
  const shareWithFriends = async () => {
    if (navigator.share) {
      try {
        tracking.trackShareOnInsta(score, "native_share");
        await navigator.share({
          title: "Adiyogi Game",
          text: `I scored ${score} points in the Adiyogi Game! Can you beat my score?`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to Instagram share (see below)
        handleInstagramShare();
      }
    } else {
      handleInstagramShare();
    }
  };

  // Fallback: Copy approved share text to clipboard and open Instagram
  const handleInstagramShare = () => {
    tracking.trackShareOnInsta(score, "instagram");
    const shareText = `I scored ${score} points in the Adiyogi Game! Can you beat my score?`;
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        alert(
          "Your score has been copied to the clipboard.\n\nPlease open Instagram, create a new post or story, and paste the text along with a screenshot of your score."
        );
        window.location.href = "instagram://app";
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
        alert(
          "Unable to copy text. Please manually copy your score and share on Instagram."
        );
      });
  };

  // Instagram contest button uses Option B (same approved text as WhatsApp share)
  const shareContestOnInstagram = () => {
    tracking.trackShareOnInsta(score, "instagram");
    const shareText = `I scored ${score} points in the Adiyogi Game! Can you beat my score?`;
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        alert(
          "Your score has been copied to the clipboard.\n\nNow, please open Instagram to paste the text along with your screenshot for sharing."
        );
        window.location.href = "instagram://app";
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
        alert(
          "Unable to copy text. Please manually share your score on Instagram."
        );
      });
  };

  const handlePlayAgain = () => {
    tracking.trackPlayAgain(score);
    onRestart();
  };

  const handleWatchNow = () => {
    tracking.trackWatchNow();
    window.open("https://sgapp.sng.link/Acxyc/dua4/5rgj", "_blank");
  };

  return (
    <div className="min-h-screen overflow-y-auto scrollbar-hide py-8">
      <div className="max-w-md mx-auto space-y-6 px-4">
        {/* Score Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 sm:p-8"
        >
          {medal && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-4"
            >
              <div className="text-6xl mb-2 animate-bounce">{medal.emoji}</div>
              <div className={`text-2xl font-bold ${medal.color} mb-1`}>
                {medal.name} Rank
              </div>
              <div className="text-sm text-white/80 mb-4">{medal.message}</div>
            </motion.div>
          )}

          <div className="text-center mb-6">
            <div className="text-xl text-white/80 mb-2">Your Score</div>
            <div className="text-5xl sm:text-6xl font-bold text-white">
              {score}
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handlePlayAgain}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-base sm:text-lg py-4 sm:py-6"
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-pulse" />
              Play Again
            </Button>
            <Button
              onClick={shareWithFriends}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-base sm:text-lg py-4 sm:py-6"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-pulse" />
              Challenge Friends
            </Button>
          </div>
        </motion.div>

        {/* Contest Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 sm:p-6"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
            Mahashivratri Contest
          </h3>
          <ul className="space-y-3 mb-6 text-white/80">
            <li className="flex items-start">
              <span className="mr-2">📱</span>
              <span>Take a screenshot of your game score</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">#️⃣</span>
              <span>Post with #MyAdiyogiGameScore</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎁</span>
              <span>
                Stand a chance to win 1 MONTH of Sadhguru Exclusive for Free! 🏆
              </span>
            </li>
          </ul>
          <Button
            onClick={shareContestOnInstagram}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-base sm:text-lg py-4 sm:py-6"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-pulse" />
            Share on Instagram
          </Button>
        </motion.div>

        {/* Bonus Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 sm:p-6"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
            Bonus Content
          </h3>
          <ul className="space-y-3 mb-6 text-white/80">
            <li className="flex items-start">
              <span className="mr-2">🎥</span>
              <span>Watch Sadhguru Exclusive Shiva Series FREE</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">⏰</span>
              <span>Until 28 February</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📱</span>
              <span>Available on Sadhguru App</span>
            </li>
          </ul>
          <Button
            onClick={handleWatchNow}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-base sm:text-lg py-4 sm:py-6"
          >
            Watch Now
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
