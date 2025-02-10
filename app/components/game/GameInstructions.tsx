import { ASSETS, GAME_CONFIG } from "@/lib/constants";

export function GameInstructions() {
  return (
    <div className="mb-8 bg-white/10 rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Spot Adiyogi</h1>
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="relative w-16 h-16">
          <img
            src={`/${ASSETS.TARGET_ICON}`}
            alt="Target Icon"
            className="w-full h-full object-contain border-2 border-yellow-400 rounded-lg"
            loading="eager"
            decoding="sync"
          />
        </div>
        <div className="text-left">
          <p className="font-medium">Spot this icon as fast as you can!</p>
          <p className="text-sm opacity-75">
            Can you beat highscore of {GAME_CONFIG.TARGET_POINTS} points?
          </p>
        </div>
      </div>
    </div>
  );
}