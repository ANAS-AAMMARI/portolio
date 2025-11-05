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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

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

    // Start typing after the initial delay
    timeoutRef.current = setTimeout(() => {
      let i = 0;
      intervalRef.current = setInterval(() => {
        if (i < text.length) {
          // Use functional update to ensure we have the latest state
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    // Main cleanup function for when the component unmounts or dependencies change
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
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
      {showCursor && (
        <span
          className={cursorClassName}
        >
          _
        </span>
      )}
    </span>
  );
}
