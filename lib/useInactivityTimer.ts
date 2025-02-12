import { useState, useEffect, useCallback, useRef } from "react";

export function useInactivityTimer(onTimeout: () => void) {
  const [showWarning, setShowWarning] = useState(false);
  const finalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const isActiveRef = useRef(true);

  const resetTimer = useCallback(() => {
    if (!isActiveRef.current) return;
    lastInteractionRef.current = Date.now();

    if (finalTimeoutRef.current) {
      clearTimeout(finalTimeoutRef.current);
      finalTimeoutRef.current = null;
    }
    setShowWarning(false);
  }, []);

  useEffect(() => {
    isActiveRef.current = true;

    checkIntervalRef.current = setInterval(() => {
      if (!isActiveRef.current) return;
      const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;

      if (timeSinceLastInteraction >= 5000 && !showWarning) {
        setShowWarning(true);

        if (!finalTimeoutRef.current) {
          finalTimeoutRef.current = setTimeout(() => {
            if (isActiveRef.current) {
              onTimeout();
            }
          }, 10000);
        }
      }
    }, 1000);

    return () => {
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
