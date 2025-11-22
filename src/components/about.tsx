"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TerminalHeader } from "@/components/ui/terminal-header";
import { Code, User } from "lucide-react";
import { motion } from "framer-motion";

const humanBio = {
  bio: "I'm AAMMARI Anas, a passionate software engineer and computer science student driven by curiosity and creativity. Deeply connected to the ever-evolving world of technology, I love exploring its newest frontiers — from Artificial Intelligence and Data Science to System Engineering. With a strong foundation in mathematics and an insatiable desire to learn, I thrive on turning complex problems into elegant, innovative solutions that make a real impact.",
  interests: ["Artificial Intelligence", "Data Science", "System Engineering"],
};

const devBio = {
  "user.bio":
    "SoftwareEngineer(passion=MAX, problem_solving_ability=EXCEPTIONAL)",
  "user.focus": ["full stack", "AI", "data_science", "systems"],
  "user.status": "Caffeinated and coding",
  "config.mode": "production",
};

const JsonProperty = ({
  keyName,
  value,
}: {
  keyName: string;
  value: string | string[];
}) => (
  <div className="ml-4">
    <span className="text-cyan-400">{`  "${keyName}"`}</span>
    <span className="text-foreground">: </span>
    <span className="text-green-400">
      {Array.isArray(value)
        ? `[${value.map((v) => `"${v}"`).join(", ")}]`
        : `"${value}"`}
    </span>
    ,
  </div>
);

export function About() {
  const [isDevMode, setIsDevMode] = useState(false);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const [borderMetrics, setBorderMetrics] = useState({
    width: 0,
    height: 0,
    radius: 0,
  });

  useLayoutEffect(() => {
    const element = borderRef.current;
    if (!element) return;

    const updateMetrics = () => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      const radius = Math.max(0, parseFloat(computedStyle.borderRadius) || 0);

      const newMetrics = {
        width: rect.width,
        height: rect.height,
        radius,
      };

      // Only update if values actually changed
      setBorderMetrics((prev) => {
        if (
          prev.width === newMetrics.width &&
          prev.height === newMetrics.height &&
          prev.radius === newMetrics.radius
        ) {
          return prev;
        }
        return newMetrics;
      });
    };

    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const strokeWidth = 2;
  const innerWidth = Math.max(borderMetrics.width - strokeWidth, 0);
  const innerHeight = Math.max(borderMetrics.height - strokeWidth, 0);
  const perimeter =
    innerWidth && innerHeight ? (innerWidth + innerHeight) * 2 : 0;
  const dashLength = perimeter ? Math.max(perimeter * 0.12, 30) : 0;

  const activeBio = isDevMode ? devBio : humanBio;

  return (
    <section id="about" className="py-24">
      <TerminalHeader prompt="~/about $" />
      <div className="flex items-center space-x-2 mb-8">
        <User
          className={`transition-colors duration-300 ${
            !isDevMode ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <Label htmlFor="dev-mode-switch">Human Mode</Label>
        <Switch
          id="dev-mode-switch"
          checked={isDevMode}
          onCheckedChange={setIsDevMode}
          className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-primary"
        />
        <Label htmlFor="dev-mode-switch">Dev Mode</Label>
        <Code
          className={`transition-colors duration-300 ${
            isDevMode ? "text-accent" : "text-muted-foreground"
          }`}
        />
      </div>

      <div className="relative">
        {perimeter > 0 && (
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 text-primary/20"
            viewBox={`0 0 ${borderMetrics.width} ${borderMetrics.height}`}
            preserveAspectRatio="none"
          >
            <motion.rect
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={innerWidth}
              height={innerHeight}
              rx={borderMetrics.radius}
              ry={borderMetrics.radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${dashLength} ${perimeter}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -(perimeter + dashLength) }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.svg>
        )}
        <motion.div ref={borderRef} className="relative rounded-lg">
          <div className="bg-card border-2 border-primary/20 p-6 rounded-lg font-code text-sm md:text-base shadow-lg transition-colors">
            <pre className="whitespace-pre-wrap">
              <motion.code
                key={isDevMode ? "dev" : "human"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${isDevMode ? "text-accent" : "text-primary"}`}
              >{`{`}</motion.code>
              <br />
              <motion.div
                key={isDevMode ? "dev-content" : "human-content"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {Object.entries(activeBio).map(([key, value]) => (
                  <JsonProperty key={key} keyName={key} value={value} />
                ))}
              </motion.div>
              <motion.code
                key={isDevMode ? "dev-close" : "human-close"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${isDevMode ? "text-accent" : "text-primary"}`}
              >{`}`}</motion.code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
