import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

interface EndPageProps {
  score: number;
  onRestart: () => void;
}

export default function EndPage({ score, onRestart }: EndPageProps) {
  const shareOnInstagram = () => {
    // Since Instagram sharing isn't directly possible, we'll guide users
    const message =
      "Screenshot your result and share on Instagram with #MyAdiyogiGameScore";
    alert(message);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-md mx-auto p-4"
    >
      {/* Greeting Card Section */}
      <div className="bg-white/10 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Thank you for spreading the joy of Mahashivratri 🙏
        </h2>
        <p className="mb-4">
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
      </div>

      {/* Game Results Section */}
      <div className="bg-white/10 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-2">
          Your Adiyogi Game Score: {score}
        </h3>
        <p className="text-lg mb-4">
          Your Adiyogi Game Score is in! Now, get ready to win big. 🚀
        </p>

        <div className="bg-yellow-500/20 p-4 rounded-lg mb-4">
          <h4 className="text-lg font-bold mb-2">🔱 Adiyogi Contest 🔱</h4>
          <ul className="text-left list-disc list-inside mb-4">
            <li>Screenshot your result 📱</li>
            <li>Share on Instagram with #MyAdiyogiGameScore</li>
            <li>
              Stand a chance to win 1 MONTH of Sadhguru Exclusive for Free! 🏆
            </li>
          </ul>
        </div>

        <Button
          onClick={shareOnInstagram}
          className="w-full mb-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Instagram className="w-5 h-5 mr-2" />
          Share on Instagram
        </Button>
      </div>

      {/* Bonus Content Section */}
      <div className="bg-white/10 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold mb-2">Bonus Content</h3>
        <p className="mb-4">
          Watch the Sadhguru Exclusive's Shiva Series FREE on Sadhguru App until
          March
        </p>
        <p className="italic mb-4">Shiva—myth, god, or the ultimate reality?</p>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={() => window.open("YOUR_WATCH_NOW_LINK", "_blank")}
        >
          Watch Now
        </Button>
      </div>

      <Button
        onClick={onRestart}
        className="w-full bg-white/20 hover:bg-white/30"
      >
        Play Again
      </Button>
    </motion.div>
  );
}
