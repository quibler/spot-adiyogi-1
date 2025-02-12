import { motion } from "framer-motion";
import { useRef } from "react";

export function GameGrid({
  icons,
  gridFlash,
  onIconClick,
  canTap,
}: {
  icons: string[];
  gridFlash: "correct" | "wrong" | null;
  onIconClick: (icon: string) => void;
  canTap: boolean;
}) {
  const lastTapTimeRef = useRef<number>(0);
  const TAP_THRESHOLD = 300; // Minimum time (ms) between taps

  const handleTap = (icon: string) => {
    const now = Date.now();
    if (now - lastTapTimeRef.current < TAP_THRESHOLD) {
      // Ignore taps that are too close together
      return;
    }
    lastTapTimeRef.current = now;
    onIconClick(icon);
  };

  const handleTouchStart = (e: React.TouchEvent, icon: string) => {
    e.preventDefault();
    handleTap(icon);
  };

  return (
    <div
      className={`grid grid-cols-5 gap-2 p-4 rounded-lg transition-colors duration-200 
        w-full aspect-square
        max-h-[85vh] 
        landscape:max-h-[85vh]
        ${
          gridFlash === "correct"
            ? "bg-green-500/80"
            : gridFlash === "wrong"
            ? "bg-red-500/80"
            : "bg-white/10"
        }`}
    >
      {icons.map((icon, index) => (
        <motion.button
          key={`${icon}-${index}`}
          whileHover={canTap ? { scale: 1.05 } : undefined}
          whileTap={canTap ? { scale: 0.95 } : undefined}
          onClick={() => handleTap(icon)}
          onTouchStart={(e) => handleTouchStart(e, icon)}
          className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center shadow-lg relative game-grid-item touch-manipulation"
        >
          <img
            src={`/${icon}`}
            alt={`icon-${index}`}
            className="w-full h-full object-cover pointer-events-none"
            loading="eager"
            decoding="sync"
          />
        </motion.button>
      ))}
    </div>
  );
}
