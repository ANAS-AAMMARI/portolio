"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/typewriter";
import { ArrowDown } from "lucide-react";

export function Landing() {
  return (
    <section id="landing" className="h-screen w-full flex flex-col items-center justify-center text-center relative">
      <div className="p-4">
        <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
          <span className="text-foreground/80">$ </span>
          <Typewriter text="whoami" delay={500} />
        </div>
        <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <Typewriter text="Anas Aammari" delay={1500} speed={75} />
        </div>
        <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Software Engineer | Problem Solver | AI Explorer
        </p>
        <Link href="#about">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-glow-primary transition-all duration-300">
            Run profile.sh
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-10 animate-pulse">
        <ArrowDown className="h-8 w-8 text-primary/50" />
      </div>
    </section>
  );
}
