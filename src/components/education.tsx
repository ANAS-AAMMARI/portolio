"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TerminalHeader } from "@/components/ui/terminal-header";
import { BookOpen, GraduationCap, Sparkle } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const educationHistory = [
  {
    id: "edu-bsc",
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    range: "Sep 2021 - Jun 2025 (expected)",
    summary:
      "Specializing in Artificial Intelligence, Data Science, and Systems Engineering with a research focus on resilient distributed systems.",
    focus: ["AI/ML", "Data Science", "Systems Engineering"],
    highlights: [
      "Dean's List (2022-2024)",
      "Research assistant for the Autonomous Infrastructure Lab",
      "Capstone: Scalable reinforcement learning for edge orchestration",
    ],
    note: "GPA: 3.9 / 4.0 · Member of the Cybersecurity Club",
    icon: GraduationCap,
  },
  {
    id: "edu-bootcamp",
    institution: "Cyber Academy",
    degree: "Applied Cybersecurity Bootcamp",
    range: "Summer 2023",
    summary:
      "Immersive program covering offensive & defensive techniques, incident response, and secure DevOps pipelines.",
    focus: ["Red Teaming", "Digital Forensics", "Cloud Security"],
    highlights: [
      "Led a team to build an automated threat hunting pipeline",
      "Presented findings to the academy's SOC leadership",
      "Awarded MVP for hands-on labs",
    ],
    note: "Capstone: Autonomous detection and remediation workflow",
    icon: BookOpen,
  },
  {
    id: "edu-specialization",
    institution: "Open Learning Trust",
    degree: "Distributed Systems Specialization",
    range: "2022 - 2023",
    summary:
      "Self-paced certifications focused on scalable microservices, observability, and resilient architecture patterns.",
    focus: ["Kubernetes", "System Design", "Observability"],
    highlights: [
      "Implemented a multi-region service mesh playground",
      "Designed an end-to-end monitoring stack with Prometheus & Grafana",
      "Graduate with distinction",
    ],
    note: "Realtime telemetry & cost-optimized deployments",
    icon: Sparkle,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 20 },
  },
};

export function Education() {
  return (
    <motion.section
      id="education"
      className="py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <TerminalHeader
        prompt="~/education.log $"
        className="flex items-center text-3xl font-bold mb-8 text-primary"
      />
      <div className="grid gap-8 lg:grid-cols-3">
        {educationHistory.map((entry) => {
          const Icon = entry.icon;
          return (
            <motion.div key={entry.id} variants={cardVariants}>
              <Card className="h-full bg-card/80 border border-primary/20 hover:border-primary/60 transition duration-300 shadow-lg shadow-primary/5">
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full border border-primary/40 bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-primary text-lg">
                        {entry.degree}
                      </CardTitle>
                      <p className="text-xs uppercase tracking-[0.4em] text-primary/70">
                        {entry.range}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.institution}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
                  <p className="text-foreground/90">{entry.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.focus.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-primary/40 bg-primary/5 text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <ul className="space-y-1 text-xs text-foreground/80">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="relative pl-4 before:absolute before:left-0 before:top-1 before:h-1 before:w-1 before:rounded-full before:bg-primary"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="text-xs text-primary/70">
                  {entry.note}
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
