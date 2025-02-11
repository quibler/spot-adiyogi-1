import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, ChevronDown } from "lucide-react";

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
    message: "Legendary! You've achieved the highest rank!"
  },
  { 
    threshold: 80, 
    name: "Platinum", 
    emoji: "⚪", 
    color: "text-slate-300",
    message: "Outstanding! You're among the elite players!"
  },
  { 
    threshold: 60, 
    name: "Gold", 
    emoji: "🥇", 
    color: "text-yellow-400",
    message: "Excellent! You've mastered the game!"
  },
  { 
    threshold: 40, 
    name: "Silver", 
    emoji: "🥈", 
    color: "text-gray-300",
    message: "Great job! Keep pushing higher!"
  },
  { 
    threshold: 20, 
    name: "Bronze", 
    emoji: "🥉", 
    color: "text-yellow-700",
    message: "Well done! You're off to a good start!"
  }
];

function getMedal(score: number) {
  return MEDALS.find(medal => score >= medal.threshold) || null;
}

export default function EndPage({ score, onRestart }: EndPageProps) {
  const shareOnInstagram = () => {
    const message = "Screenshot your result and share on Instagram with #MyAdiyogiGameScore";
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
          {/* Medal Display */}
          {medal ? (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-6"
            >
              <div className="text-7xl mb-4 animate-bounce">{medal.emoji}</div>
              <div className={`text-3xl font-bold ${medal.color} mb-2`}>
                {medal.name} Rank
              </div>
              <div className="text-lg text-white/80">
                {medal.message}
              </div>
            </motion.div>
          ) : (
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">Keep Practicing!</div>
              <div className="text-lg text-white/80">
                Score 20+ to earn your first medal
              </div>
            </div>
          )}

          <div className="text-5xl sm:text-6xl font-bold mb-4 sm:mb-6 text-white text-center">
            {score}
          </div>

          <div className="bg-white/10 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-2">Medal Thresholds:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {MEDALS.map((m) => (
                <div 
                  key={m.name} 
                  className={`flex items-center gap-2 ${score >= m.threshold ? m.color : 'text-white/50'}`}
                >
                  <span>{m.emoji}</span>
                  <span>{m.name}: {m.threshold}+</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={shareOnInstagram}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-base sm:text-lg py-4 sm:py-6"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Share on Instagram
            </Button>
            <Button
              onClick={onRestart}
              className="w-full bg-white/20 hover:bg-white/30 text-base sm:text-lg py-4 sm:py-6"
            >
              Play Again
            </Button>
          </div>
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
            Watch the Sadhguru Exclusive&apos;s Shiva Series FREE on Sadhguru App until March
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
            On this sacred night, thousands of seekers gather at Isha Yoga Center,
            Coimbatore, in devotion and celebration. Join the tradition of
            offering nourishment to those on the spiritual path by supporting Maha
            Annadanam.
          </p>
          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            onClick={() => window.open("YOUR_CONTRIBUTION_LINK", "_blank")}
          >
            Make A Contribution
          </Button>
        </motion.div>
      </div>
    </div>
  );
}