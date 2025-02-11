import { GAME_CONFIG } from "@/lib/constants";

interface GameStatsProps {
  score: number;
  lives: number;
  shuffleInterval: number;
  speedFlash: boolean;
}

export function GameStats({
  score,
  lives,
  shuffleInterval,
  speedFlash,
}: GameStatsProps) {
  // Calculate speed multiplier and number of bars to show
  const getSpeedInfo = () => {
    const speedMultiplier =
      GAME_CONFIG.INITIAL_SHUFFLE_INTERVAL / shuffleInterval;
    // Calculate filled bars based on speed from 1x to 3x across 10 bars
    // e.g., 1x = 1 bar, 1.2x = 2 bars, 1.4x = 3 bars, etc.
    const filledBars = Math.min(
      Math.max(Math.floor(((speedMultiplier - 1) / 2) * 10) + 1, 1),
      10
    );
    return { speedMultiplier, filledBars };
  };

  // Get color for each bar based on its position
  const getBarColor = (barIndex: number) => {
    const { filledBars } = getSpeedInfo();
    if (barIndex >= filledBars) return "bg-white/10"; // Empty bar

    // Colors from easiest to hardest (10 levels)
    const colors = [
      "bg-green-600", // 1.0x speed
      "bg-green-500", // 1.2x speed
      "bg-green-400", // 1.4x speed
      "bg-yellow-400", // 1.6x speed
      "bg-yellow-500", // 1.8x speed
      "bg-orange-400", // 2.0x speed
      "bg-orange-500", // 2.2x speed
      "bg-red-400", // 2.4x speed
      "bg-red-500", // 2.6x speed
      "bg-red-600", // 2.8x-3.0x speed
    ];
    return colors[barIndex];
  };

  const { speedMultiplier } = getSpeedInfo();

  return (
    <div className="flex justify-between items-center bg-white/10 rounded-lg mb-4 p-4">
      {/* Score */}
      <div className="text-center">
        <div className="text-sm opacity-75">Score</div>
        <div className="text-2xl font-bold">{score}</div>
      </div>

      {/* Speed */}
      <div className="flex-1 mx-8">
        <div className="text-sm opacity-75 mb-1">
          Speed: {speedMultiplier.toFixed(1)}x
        </div>
        <div className="flex gap-1 justify-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`h-5 w-1.5 rounded-sm transition-all duration-300 ${getBarColor(
                index
              )} ${speedFlash ? "scale-110" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Lives */}
      <div className="text-center">
        <div className="text-sm opacity-75">Lives</div>
        <div className="text-2xl font-bold">{lives}</div>
      </div>
    </div>
  );
}
