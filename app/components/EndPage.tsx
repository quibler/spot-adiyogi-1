import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface EndPageProps {
  score: number;
  onRestart: () => void;
}

export default function EndPage({ score, onRestart }: EndPageProps) {
  const shareScore = async () => {
    try {
      await navigator.share({
        title: 'Spot Adiyogi Game',
        text: `I scored ${score} points in the Spot Adiyogi game! Can you beat my score?`,
        url: window.location.href
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="px-4 py-6 max-w-md mx-auto space-y-6">
      {/* A. Score Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-lg p-6 text-center"
      >
        <h2 className="text-2xl font-bold mb-2">Your Score</h2>
        <div className="text-6xl font-bold mb-6 text-yellow-400">{score}</div>
        <div className="grid gap-4">
          <Button 
            onClick={onRestart}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Play Again
          </Button>
          <Button 
            onClick={shareScore}
            variant="outline"
            className="w-full border-white/20 hover:bg-white/10"
          >
            <Share2 className="mr-2" />
            Invite Friends to Play
          </Button>
        </div>
      </motion.div>

      {/* B. Contest Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold mb-4">Participate In Mahashivratri Contest</h3>
        <div className="bg-white/10 p-4 rounded-lg mb-4">
          <p className="text-sm leading-relaxed">
            Take a Screenshot of your Game Score and Post on Instagram using #MyAdiyogiGameScore, 
            and get a chance to win 1 Month Free Access to Sadhguru Exclusive.
          </p>
        </div>
      </motion.div>

      {/* C. Bonus Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold mb-2">Free Access</h3>
        <p className="text-sm mb-4">
          Sadhguru Exclusive - Shiva Series until 28 Feb. Available on Sadhguru App.
        </p>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => window.open("YOUR_ACCESS_LINK", "_blank")}
        >
          Access Now
        </Button>
      </motion.div>
    </div>
  );
}