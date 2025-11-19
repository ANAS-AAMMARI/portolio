"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Code, User } from "lucide-react";
import { motion } from "framer-motion";

const humanBio = {
  bio: "I’m AAMMARI Anas, a passionate software engineer and computer science student driven by curiosity and creativity. Deeply connected to the ever-evolving world of technology, I love exploring its newest frontiers — from Artificial Intelligence and Data Science to System Engineering. With a strong foundation in mathematics and an insatiable desire to learn, I thrive on turning complex problems into elegant, innovative solutions that make a real impact.",
  interests: ["Artificial Intelligence", "Data Science", "System Engineering"],
};

const devBio = {
  "user.bio":
    "SoftwareEngineer(passion=MAX, problem_solving_ability=EXCEPTIONAL)",
  "user.focus": ["full stack", "AI", "data_science", "systems"],
  "user.status": "Caffeinated and coding",
  "config.mode": "production",
};

export function About() {
  const [isDevMode, setIsDevMode] = useState(false);

  return (
    <section id="about" className="py-24">
      <h2 className="text-3xl font-bold mb-8 text-primary">
        <span className="text-foreground/80">~/</span>about $
      </h2>
      <div className="flex items-center space-x-2 mb-8">
        <User
          className={`transition-colors ${
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
          className={`transition-colors ${
            isDevMode ? "text-accent" : "text-muted-foreground"
          }`}
        />
      </div>

      <div className="bg-card border-2 border-primary/20 p-6 rounded-lg font-code text-sm md:text-base shadow-lg hover:border-primary/50 transition-colors">
        <pre className="whitespace-pre-wrap">
          <code
            className={`${isDevMode ? "text-accent" : "text-primary"}`}
          >{`{`}</code>
          <br />
          {isDevMode
            ? Object.entries(devBio).map(([key, value]) => (
                <div key={key} className="ml-4">
                  <span className="text-cyan-400">{`  "${key}"`}</span>
                  <span className="text-foreground">: </span>
                  <span className="text-green-400">
                    {Array.isArray(value)
                      ? `[${value.map((v) => `"${v}"`).join(", ")}]`
                      : `"${value}"`}
                  </span>
                  ,
                </div>
              ))
            : Object.entries(humanBio).map(([key, value]) => (
                <div key={key} className="ml-4">
                  <span className="text-cyan-400">{`  "${key}"`}</span>
                  <span className="text-foreground">: </span>
                  <span className="text-green-400">
                    {Array.isArray(value)
                      ? `[${value.map((v) => `"${v}"`).join(", ")}]`
                      : `"${value}"`}
                  </span>
                  ,
                </div>
              ))}
          <code
            className={`${isDevMode ? "text-accent" : "text-primary"}`}
          >{`}`}</code>
        </pre>
      </div>
    </section>
  );
}
