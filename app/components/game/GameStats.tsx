import { Heart, X } from "lucide-react";
import { GAME_CONFIG } from "@/lib/constants";

interface GameStatsProps {
  score: number;
  lives: number;
  shuffleInterval: number;
  speedFlash: boolean;
  onQuit: () => void;
}

export function GameStats({
  score,
  lives,
  shuffleInterval,
  speedFlash,
  onQuit,
}: GameStatsProps) {
  // Calculate speed multiplier and number of bars to show
  const getSpeedInfo = () => {
    const speedMultiplier =
      GAME_CONFIG.INITIAL_SHUFFLE_INTERVAL / shuffleInterval;
    // Start at 1 bar, add a bar every 0.2x increase in speed
    // e.g., 1x = 1 bar, 1.2x = 2 bars, 1.4x = 3 bars, etc.
    const filledBars = Math.min(
      Math.max(Math.floor((speedMultiplier - 0.9) / 0.2) + 1, 1),
      5
    );
    return { speedMultiplier, filledBars };
  };

  // Get color for each bar based on its position
  const getBarColor = (barIndex: number) => {
    const { filledBars } = getSpeedInfo();
    if (barIndex >= filledBars) return "bg-white/10"; // Empty bar

    // Colors from easiest to hardest
    const colors = [
      "bg-green-500", // 1x speed (default)
      "bg-yellow-500", // 1.2x speed
      "bg-orange-500", // 1.4x speed
      "bg-red-500", // 1.6x speed
      "bg-purple-500", // 1.8x+ speed
    ];
    return colors[barIndex];
  };

  return (
    <div className="flex justify-between items-start p-4">
      {/* Left side stats */}
      <div className="flex flex-col gap-6">
        {/* Score */}
        <div className="flex flex-col gap-2">
          <div className="text-sm text-white/60">Score</div>
          <div className="text-4xl font-bold">{score}</div>
        </div>
        {/* Difficulty */}
        <div className="flex flex-col gap-2">
          <div className="text-sm text-white/60">Difficulty</div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`h-5 w-2.5 rounded-sm transition-all duration-300 ${getBarColor(
                  index
                )} ${speedFlash ? "scale-110" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side stats */}
      <div className="flex flex-col gap-6 items-end">
        {/* Lives */}
        <div className="flex flex-col gap-2 items-end">
          <div className="text-sm text-white/60">Lives</div>
          <div className="flex gap-1">
            {Array.from({ length: GAME_CONFIG.MAX_LIVES }).map((_, index) => (
              <Heart
                key={index}
                className={`w-7 h-7 ${
                  index < lives ? "text-red-500 fill-red-500" : "text-white/20"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Quit button */}
        <button
          onClick={onQuit}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Quit Game"
        >
          <X className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
