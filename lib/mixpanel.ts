// lib/mixpanel.ts
import mixpanel from "mixpanel-browser";

// Initialize Mixpanel with environment-specific settings
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "", {
  debug: process.env.NODE_ENV === "development",
  persistence: "localStorage",
  ignore_dnt: true,
});

// Define event tracking interfaces for better type safety
interface GameCompletedEvent {
  score: number;
  medal?: string;
  duration?: number;
}

// Track events with proper properties following Mixpanel best practices
export const MixpanelTracking = {
  // Track game start with any initial properties
  trackGameStarted: () => {
    mixpanel.track("adiyogi_game_started", {
      platform: "web",
      timestamp: new Date().toISOString(),
    });
  },

  // Track game completion with score details
  trackGameCompleted: ({ score, medal, duration }: GameCompletedEvent) => {
    mixpanel.track("adiyogi_game_completed", {
      score,
      medal,
      duration,
      platform: "web",
      timestamp: new Date().toISOString(),
    });
  },

  // Track Instagram share attempt
  trackShareOnInsta: (score: number) => {
    mixpanel.track("adiyogi_shareoninsta_cta", {
      score,
      platform: "web",
      timestamp: new Date().toISOString(),
    });
  },

  // Track watch now CTA clicks
  trackWatchNow: () => {
    mixpanel.track("adiyogi_watchnow_cta", {
      platform: "web",
      timestamp: new Date().toISOString(),
    });
  },

  // Track donate button clicks
  trackDonate: () => {
    mixpanel.track("adiyogi_donate", {
      platform: "web",
      timestamp: new Date().toISOString(),
    });
  },

  // Track play again clicks
  trackPlayAgain: (previousScore: number) => {
    mixpanel.track("adiyogi_playagain", {
      previous_score: previousScore,
      platform: "web",
      timestamp: new Date().toISOString(),
    });
  },
};

// Type-safe hook for using Mixpanel tracking
export const useTracking = () => {
  return MixpanelTracking;
};

export default mixpanel;
