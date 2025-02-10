import { ASSETS } from "@/lib/constants";
import { useEffect } from 'react';

export function ImagePreloader() {
  useEffect(() => {
    // Preload all game images
    const imagesToPreload = [...ASSETS.DUMMY_ICONS, ASSETS.TARGET_ICON];
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = `/${src}`;
    });
  }, []);

  return null;
}