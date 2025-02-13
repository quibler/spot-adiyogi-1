// lib/mixpanel.ts
import mixpanel from "mixpanel-browser";

// Define types for event properties
interface BaseEventProperties {
  platform: string;
  timestamp: string;
}

interface GameCompletedProperties extends BaseEventProperties {
  score: number;
  medal?: string;
  duration?: number;
}

interface ShareProperties extends BaseEventProperties {
  score: number;
}

interface PlayAgainProperties extends BaseEventProperties {
  previous_score: number;
}

// For static export, hardcode the token
const MIXPANEL_TOKEN = "your_token_here"; // Replace with your actual token

// Track initialization state
let isMixpanelInitialized = false;

// Initialize mixpanel only on the client side
const initMixpanel = () => {
  try {
    if (typeof window !== "undefined" && !isMixpanelInitialized) {
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: false, // Set to true during development if needed
        track_pageview: true,
        persistence: "localStorage",
        ignore_dnt: true,
        batch_requests: true,
        api_host: "https://api-js.mixpanel.com",
      });
      isMixpanelInitialized = true;
    }
  } catch (e) {
    console.error("Failed to initialize Mixpanel:", e);
  }
};

// Safe tracking wrapper with proper typing
const track = <T extends BaseEventProperties>(
  eventName: string,
  properties?: Omit<T, keyof BaseEventProperties>
) => {
  try {
    if (typeof window !== "undefined") {
      if (!isMixpanelInitialized) {
        initMixpanel();
      }
      mixpanel.track(eventName, {
        ...properties,
        platform: "web",
        timestamp: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.error("Failed to track event:", eventName, e);
  }
};

// Track events with proper properties
export const MixpanelTracking = {
  trackGameStarted: () => {
    track<BaseEventProperties>("adiyogi_game_started");
  },

  trackGameCompleted: ({
    score,
    medal,
    duration,
  }: Omit<GameCompletedProperties, keyof BaseEventProperties>) => {
    track<GameCompletedProperties>("adiyogi_game_completed", {
      score,
      medal,
      duration,
    });
  },

  trackShareOnInsta: (score: number) => {
    track<ShareProperties>("adiyogi_shareoninsta_cta", {
      score,
    });
  },

  trackWatchNow: () => {
    track<BaseEventProperties>("adiyogi_watchnow_cta");
  },

  trackDonate: () => {
    track<BaseEventProperties>("adiyogi_donate");
  },

  trackPlayAgain: (previousScore: number) => {
    track<PlayAgainProperties>("adiyogi_playagain", {
      previous_score: previousScore,
    });
  },
};

// React hook
export const useTracking = () => {
  // Initialize Mixpanel when the hook is first used
  if (typeof window !== "undefined" && !isMixpanelInitialized) {
    initMixpanel();
  }
  return MixpanelTracking;
};
