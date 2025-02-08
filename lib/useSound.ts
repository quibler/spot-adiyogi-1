export const useSound = () => {
  const tryVibrate = (duration: number) => {
    // Check if vibration is supported and we're in a secure context
    if (typeof window !== 'undefined' && 
        'vibrate' in navigator && 
        window.isSecureContext) {
      try {
        navigator.vibrate(duration);
      } catch (error) {
        console.log('Vibration failed:', error);
      }
    }
  };

  const playScore = () => {
    const audio = new Audio("/sounds/score.mp3");
    audio.play().catch(() => {});
    tryVibrate(50);
  };

  const playWrong = () => {
    const audio = new Audio("/sounds/wrong.mp3");
    audio.play().catch(() => {});
    tryVibrate(200);
  };

  return { playScore, playWrong };
};