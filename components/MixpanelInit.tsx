"use client";
import { useEffect } from "react";
import { initMixpanel } from "@/lib/mixpanel";

export default function MixpanelInit() {
  useEffect(() => {
    initMixpanel();
  }, []);

  return null;
}