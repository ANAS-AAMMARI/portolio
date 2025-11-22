"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DEFAULT_MOTION = {
  initial: { opacity: 0, y: -12 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } as const,
};

type TerminalHeaderProps = Omit<HTMLMotionProps<"h2">, "children"> & {
  prompt: string;
  highlightPrefixLength?: number;
  delayAfterComplete?: number;
  onReady?: () => void;
  highlightClassName?: string;
  cursorClassName?: string;
  className?: string;
};

export function TerminalHeader({
  prompt,
  highlightPrefixLength = 2,
  delayAfterComplete = 300,
  onReady,
  highlightClassName = "text-foreground/80",
  cursorClassName = "ml-2 inline-block font-mono text-primary transition-opacity duration-150",
  className = "flex items-center text-3xl font-bold mb-8 text-primary",
  ...rest
}: TerminalHeaderProps) {
  const { initial, animate, transition, ...motionRest } = rest;
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const onReadyRef = useRef(onReady);

  const hasVariants = typeof motionRest.variants !== "undefined";
  const resolvedInitial =
    initial ?? (hasVariants ? undefined : DEFAULT_MOTION.initial);
  const resolvedAnimate =
    animate ?? (hasVariants ? undefined : DEFAULT_MOTION.animate);
  const resolvedTransition =
    transition ?? (hasVariants ? undefined : DEFAULT_MOTION.transition);

  useEffect(() => {
    setTyped("");
  }, [prompt]);

  useEffect(() => {
    if (typed.length === prompt.length) {
      return;
    }
    const timeout = setTimeout(() => {
      setTyped(prompt.slice(0, typed.length + 1));
    }, 90);
    return () => clearTimeout(timeout);
  }, [typed, prompt]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (typed !== prompt) {
      return;
    }
    const delayTimer = setTimeout(() => {
      onReadyRef.current?.();
    }, delayAfterComplete);
    return () => clearTimeout(delayTimer);
  }, [typed, prompt, delayAfterComplete]);

  const prefixLength = Math.min(highlightPrefixLength, typed.length);
  const prefixText = typed.slice(0, prefixLength);
  const suffixText = typed.slice(prefixLength);

  return (
    <motion.h2
      className={className}
      initial={resolvedInitial}
      animate={resolvedAnimate}
      transition={resolvedTransition}
      {...motionRest}
    >
      <span className="text-primary">
        <span className={highlightClassName}>{prefixText}</span>
        {suffixText}
      </span>
      <span
        className={`${cursorClassName} ${
          cursorVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        ▍
      </span>
    </motion.h2>
  );
}
