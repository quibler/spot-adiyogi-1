interface GameProgressProps {
  score: number;
  targetPoints: number;
  wrongTaps: number[];
  correctTaps: number[];
}

export function GameProgress({
  targetPoints,
  wrongTaps,
  correctTaps,
}: GameProgressProps) {
  return (
    <div className="mt-4 flex flex-col gap-1">
      {/* First row: 0-24 */}
      <div className="flex gap-1 justify-between">
        {Array.from({ length: Math.ceil(targetPoints / 2) }).map((_, index) => {
          let dotColor = "bg-white/20"; // Default grey for remaining
          let scale = "scale-100";

          if (wrongTaps.includes(index)) {
            dotColor = "bg-red-500";
            scale = "scale-110";
          } else if (correctTaps.includes(index)) {
            dotColor = "bg-green-500";
            scale = "scale-110";
          }

          return (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${dotColor} ${scale}`}
            />
          );
        })}
      </div>
      {/* Second row: 25-49 */}
      <div className="flex gap-1 justify-between">
        {Array.from({ length: Math.floor(targetPoints / 2) }).map((_, i) => {
          const index = i + Math.ceil(targetPoints / 2);
          let dotColor = "bg-white/20";
          let scale = "scale-100";

          if (wrongTaps.includes(index)) {
            dotColor = "bg-red-500";
            scale = "scale-110";
          } else if (correctTaps.includes(index)) {
            dotColor = "bg-green-500";
            scale = "scale-110";
          }

          return (
            <div
              key={index} // Add key here
              className="mt-4 mb-6 flex flex-col"
            >
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${dotColor} ${scale}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
