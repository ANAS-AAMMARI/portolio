"use client";

import { useEffect } from "react";

const fullTitle = "Anas Aammari | Mind of Code";
const durationMs = 2400;
const cursorChar = "▮";

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function AnimatedDocumentTitle() {
  useEffect(() => {
    const originalTitle = document.title;
    let startTime: number | null = null;
    let rafId: number;
    let cursorInterval: NodeJS.Timeout;
    let showCursor = true;

    // Blinking cursor effect
    cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 530);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutQuart(progress);
      const visibleChars = Math.max(1, Math.round(eased * fullTitle.length));

      const startIndex = Math.max(fullTitle.length - visibleChars, 0);
      const visibleText = fullTitle.slice(startIndex);

      // Add cursor during animation, remove when complete
      document.title =
        progress < 1 && showCursor ? visibleText + cursorChar : visibleText;

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        clearInterval(cursorInterval);
        document.title = fullTitle;
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(cursorInterval);
      document.title = originalTitle;
    };
  }, []);

  return null;
}
