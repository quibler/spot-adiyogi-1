import { motion } from "framer-motion";

export function GameGrid({
  icons,
  gridFlash,
  onIconClick,
  canTap,
}: {
  icons: string[];
  gridFlash: "correct" | "wrong" | null; // Update this type
  onIconClick: (icon: string) => void;
  canTap: boolean;
  shuffleInterval: number;
}) {
  const handleTouchStart = (e: React.TouchEvent, icon: string) => {
    e.preventDefault();
    onIconClick(icon);
  };

  return (
    <div
      className={`grid grid-cols-5 gap-2 p-4 rounded-lg transition-colors duration-200 ${
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
          onClick={() => onIconClick(icon)}
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
