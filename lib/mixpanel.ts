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
  completed_type: 'timeout' | 'quit' | 'game_over';
}

interface ShareProperties extends BaseEventProperties {
  score: number;
  share_method: 'instagram' | 'native_share';  // Changed from 'platform' to 'share_method'
}

interface PlayAgainProperties extends BaseEventProperties {
  previous_score: number;
}

const MIXPANEL_TOKEN = "8f2198148dc13f47cf0c85c4698370f2";
let isMixpanelInitialized = false;

export const initMixpanel = () => {
  try {
    if (typeof window !== "undefined" && !isMixpanelInitialized) {
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === 'development',
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

const track = <T extends BaseEventProperties>(
  eventName: string,
  properties?: Omit<T, keyof BaseEventProperties>
) => {
  try {
    if (typeof window !== "undefined") {
      if (!isMixpanelInitialized) {
        initMixpanel();
      }
      const eventProperties = {
        ...properties,
        platform: "web",
        timestamp: new Date().toISOString(),
      };
      mixpanel.track(eventName, eventProperties);
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Mixpanel] Tracked ${eventName}:`, eventProperties);
      }
    }
  } catch (e) {
    console.error(`Failed to track ${eventName}:`, e);
  }
};

export const MixpanelTracking = {
  trackGameStarted: () => {
    track<BaseEventProperties>("adiyogi_game_started");
  },

  trackGameCompleted: ({
    score,
    medal,
    duration,
    completed_type,
  }: Omit<GameCompletedProperties, keyof BaseEventProperties>) => {
    track<GameCompletedProperties>("adiyogi_game_completed", {
      score,
      medal,
      duration,
      completed_type,
    });
  },

  trackShareOnInsta: (score: number, share_method: 'instagram' | 'native_share') => {
    track<ShareProperties>("adiyogi_shareoninsta_cta", {
      score,
      share_method,
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

export const useTracking = () => {
  if (typeof window !== "undefined" && !isMixpanelInitialized) {
    initMixpanel();
  }
  return MixpanelTracking;
};