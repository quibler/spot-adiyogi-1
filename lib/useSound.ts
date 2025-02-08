export const useSound = () => {
  const playScore = () => {
    const audio = new Audio("/sounds/score.mp3");
    audio.play().catch(() => {});
    // Trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const playWrong = () => {
    const audio = new Audio("/sounds/wrong.mp3");
    audio.play().catch(() => {});
    // Longer vibration for wrong moves
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  return { playScore, playWrong };
};
