import { ASSETS } from "@/lib/constants";
import { X } from "lucide-react";
interface GameInstructionsProps {
  onQuit: () => void;
}
export function GameInstructions({ onQuit }: GameInstructionsProps) {
  return (
    <div className="flex justify-between bg-white/10 rounded-lg mb-4 p-4">
      <div className="relative w-16 h-16">
        <img
          src={`/${ASSETS.TARGET_ICON}`}
          alt="Target Icon"
          className="w-full h-full object-contain border-2 border-yellow-400 rounded-lg"
          loading="eager"
          decoding="sync"
        />
      </div>
      <h1 className="text-2xl font-bold my-auto">Spot Adiyogi</h1>
      <button
        onClick={onQuit}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        title="Quit Game"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
