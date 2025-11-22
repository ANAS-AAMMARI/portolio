"use client";

import { motion } from "framer-motion";
import { TerminalHeader } from "@/components/ui/terminal-header";

const experienceLog = [
  {
    date: "2023-09-01",
    event: "Joined XYZ Corp as Software Engineer Intern",
    details:
      "Developed backend services and contributed to a major microservices migration project.",
  },
  {
    date: "2023-05-15",
    event: "Graduated from University of Technology",
    details:
      "Bachelor of Science in Computer Science, specialized in AI and Machine Learning.",
  },
  {
    date: "2022-06-01",
    event: "Started role as a Freelance Web Developer",
    details:
      "Built and maintained web applications for various clients using modern web technologies.",
  },
  {
    date: "2021-08-20",
    event: "Won 1st Place at National Hackathon 'CodeBreak'",
    details:
      "Led a team to build a cybersecurity tool that identifies network vulnerabilities in real-time.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <TerminalHeader
        prompt="~/experience.log $"
        className="flex items-center text-3xl font-bold mb-8 text-primary"
      />
      <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
        {experienceLog.map((entry, index) => (
          <motion.div
            key={index}
            className="relative group border-b-0 rounded-lg"
            whileHover={{
              translateX: 2,
              boxShadow: "0 12px 30px rgba(15,23,42,0.25)",
              borderLeftWidth: "4px",
              borderLeftColor: "#bfff00",
              paddingLeft: ".5rem",
              paddingTop: ".5rem",
              paddingBottom: ".5rem",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 35,
              mass: 0.8,
            }}
          >
            <div
              aria-hidden
              className="absolute -left-[33px] top-4 -translate-x-1/2 h-4 w-4 bg-primary rounded-full border-4 border-background transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:-left-[38px]"
            />
            <p className="text-sm text-primary/80 mb-1 font-semibold">{`[${entry.date}]`}</p>
            <h3 className="text-xl font-bold text-foreground">{entry.event}</h3>
            <p className="text-muted-foreground mt-1">{entry.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
