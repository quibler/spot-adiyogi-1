import { useState, useEffect, useCallback, useRef } from "react";

export function useInactivityTimer(onTimeout: () => void) {
  const [showWarning, setShowWarning] = useState(false);
  const finalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const isActiveRef = useRef(true);

  const resetTimer = useCallback(() => {
    if (!isActiveRef.current) return;
    console.log("[Timer] Resetting timer - new interaction detected");
    lastInteractionRef.current = Date.now();

    if (finalTimeoutRef.current) {
      console.log("[Timer] Clearing final timeout");
      clearTimeout(finalTimeoutRef.current);
      finalTimeoutRef.current = null;
    }
    setShowWarning(false);
  }, []);

  useEffect(() => {
    console.log("[Timer] Setting up inactivity check interval");
    isActiveRef.current = true;

    checkIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
      console.log(
        `[Timer] Time since last interaction: ${Math.floor(
          timeSinceLastInteraction / 1000
        )}s`
      );

      if (timeSinceLastInteraction >= 5000 && !showWarning) {
        console.log("[Timer] Showing inactivity warning");
        setShowWarning(true);

        if (!finalTimeoutRef.current) {
          finalTimeoutRef.current = setTimeout(() => {
            if (isActiveRef.current) {
              console.log("[Timer] Final timeout reached - ending game");
              onTimeout();
            }
          }, 10000);
        }
      }
    }, 1000);

    return () => {
      console.log("[Timer] Cleaning up timer");
      isActiveRef.current = false;
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
      if (finalTimeoutRef.current) {
        clearTimeout(finalTimeoutRef.current);
        finalTimeoutRef.current = null;
      }
    };
  }, [onTimeout]);

  return { showWarning, resetTimer };
}
