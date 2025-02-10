export type GameState = "start" | "game" | "end" | "victory";

export interface GamePageProps {
  onEnd: (score: number) => void;
}

export type GridFlashState = "correct" | "wrong" | null;