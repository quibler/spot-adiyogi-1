import { ASSETS } from "@/lib/constants";
import { X } from "lucide-react";
interface GameInstructionsProps {
  onQuit: () => void;
}
export function GameInstructions({ onQuit }: GameInstructionsProps) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-6 mb-4">
      <div className="relative w-12 h-12">
        <img
          src={`/${ASSETS.TARGET_ICON}`}
          alt="Target Icon"
          className="w-full h-full object-contain border-2 border-yellow-400 rounded-lg"
          loading="eager"
          decoding="sync"
        />
      </div>
      <h1 className="text-2xl text-center font-bold">Spot Adiyogi</h1>
      <button
        onClick={onQuit}
        className="p-2 hover:bg-white/20 rounded-full transition-colors"
        title="Quit Game"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
