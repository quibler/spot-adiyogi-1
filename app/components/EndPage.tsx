import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, ChevronDown } from "lucide-react";

interface EndPageProps {
  score: number;
  onRestart: () => void;
}

const MEDALS = [
  { threshold: 108, name: "Diamond", emoji: "💎", color: "text-blue-300" },
  { threshold: 90, name: "Platinum", emoji: "🏆", color: "text-slate-300" },
  { threshold: 70, name: "Gold", emoji: "🥇", color: "text-yellow-400" },
  { threshold: 50, name: "Bronze", emoji: "🥉", color: "text-yellow-700" },
  { threshold: 30, name: "Iron", emoji: "⚔️", color: "text-gray-400" },
];

function getMedal(score: number) {
  return MEDALS.find((medal) => score >= medal.threshold) || null;
}

export default function EndPage({ score, onRestart }: EndPageProps) {
  const shareOnInstagram = () => {
    const message =
      "Screenshot your result and share on Instagram with #MyAdiyogiGameScore";
    alert(message);
  };

  const medal = getMedal(score);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {/* Score Card */}
      <div className="h-screen w-full flex items-center justify-center snap-start p-2 sm:p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 sm:p-8 w-full max-w-md"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-yellow-400">
            Game Over
          </h2>

          {/* Medal Display */}
          {medal && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6"
            >
              <div className="text-6xl mb-2">{medal.emoji}</div>
              <div className={`text-2xl font-bold ${medal.color}`}>
                {medal.name} Rank
              </div>
            </motion.div>
          )}

          <div className="text-5xl sm:text-6xl font-bold mb-4 sm:mb-6 text-white">
            {score}
          </div>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6">
            Great effort! Keep practicing to achieve higher ranks! 🚀
          </p>

          <div className="bg-yellow-500/20 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
            <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              🔱 Adiyogi Contest 🔱
            </h4>
            <ul className="text-left list-disc list-inside mb-3 sm:mb-4 text-base sm:text-lg space-y-1 sm:space-y-2">
              <li>Screenshot your result 📱</li>
              <li>Share on Instagram with #MyAdiyogiGameScore</li>
              <li>
                Stand a chance to win 1 MONTH of Sadhguru Exclusive for Free! 🏆
              </li>
            </ul>
          </div>

          <Button
            onClick={shareOnInstagram}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base sm:text-lg py-4 sm:py-6"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Share on Instagram
          </Button>
        </motion.div>
        <div className="absolute bottom-4 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Bonus Content Card */}
      <div className="h-screen w-full flex items-center justify-center snap-start p-2 sm:p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 sm:p-6 w-full max-w-md"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-2">Bonus Content</h3>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Watch the Sadhguru Exclusive&apos;s Shiva Series FREE on Sadhguru
            App until March
          </p>
          <p className="italic mb-3 sm:mb-4 text-sm sm:text-base">
            Shiva—myth, god, or the ultimate reality?
          </p>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => window.open("YOUR_WATCH_NOW_LINK", "_blank")}
          >
            Watch Now
          </Button>
        </motion.div>
        <div className="absolute bottom-4 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Mahashivratri Card */}
      <div className="h-screen w-full flex items-center justify-center snap-start p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 rounded-lg p-4 sm:p-6 w-full max-w-md"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Thank you for spreading the joy of Mahashivratri 🙏
          </h3>
          <p className="mb-4 text-sm sm:text-base">
            On this sacred night, thousands of seekers gather at Isha Yoga
            Center, Coimbatore, in devotion and celebration. Join the tradition
            of offering nourishment to those on the spiritual path by supporting
            Maha Annadanam.
          </p>
          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black mb-4"
            onClick={() => window.open("YOUR_CONTRIBUTION_LINK", "_blank")}
          >
            Make A Contribution
          </Button>
          <Button
            onClick={onRestart}
            className="w-full bg-white/20 hover:bg-white/30 text-base sm:text-lg py-4 sm:py-6"
          >
            Play Again
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
