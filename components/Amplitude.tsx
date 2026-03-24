"use client";

import * as amplitude from "@amplitude/unified";

function initAmplitude() {
  if (typeof window !== "undefined") {
    amplitude.initAll("a76c0231f186138f37357079f598f5d4", {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
