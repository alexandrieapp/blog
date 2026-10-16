import { useEffect } from "react";

const API_KEY = "a76c0231f186138f37357079f598f5d4";

// Le SDK est chargé après le premier rendu, hors du chemin critique de la page.
export const Amplitude = () => {
  useEffect(() => {
    let cancelled = false;
    const load = () =>
      import("@amplitude/unified").then((amplitude) => {
        if (cancelled) return;
        amplitude.initAll(API_KEY, {
          analytics: { autocapture: true },
          sessionReplay: { sampleRate: 1 },
        });
      });

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(load)
        : window.setTimeout(load, 2000);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, []);

  return null;
};
