"use client";

import { useState, useEffect, useRef } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
};

export function Typewriter({
  text,
  speed = 100,
  delay = 0,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Use refs to hold timer IDs
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    // Clear any existing timers from previous renders to prevent race conditions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset state for the new text
    setDisplayedText("");
    setIsTyping(true);
    setShowCursor(true);
    indexRef.current = 0;

    const characters = Array.from(text);

    if (characters.length === 0) {
      setIsTyping(false);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        const nextIndex = indexRef.current + 1;

        setDisplayedText(characters.slice(0, nextIndex).join(""));
        indexRef.current = nextIndex;

        if (nextIndex >= characters.length) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    // Main cleanup function for when the component unmounts or dependencies change
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed, delay]);

  // Effect for blinking cursor when typing is finished
  useEffect(() => {
    if (!isTyping) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500); // Standard cursor blink speed
      return () => clearInterval(cursorInterval);
    } else {
      setShowCursor(true); // Ensure cursor is visible while typing
    }
  }, [isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className={cursorClassName}>_</span>}
    </span>
  );
}
