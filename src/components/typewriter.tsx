"use client";

import { useState, useEffect } from "react";

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

  useEffect(() => {
    const startTyping = () => {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, speed);
    };

    const timeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  useEffect(() => {
    if (!isTyping) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className={cursorClassName}
          style={{ animation: isTyping ? "none" : "blink 1s infinite" }}
        >
          _
        </span>
      )}
    </span>
  );
}
