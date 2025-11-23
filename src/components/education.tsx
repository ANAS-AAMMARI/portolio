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
    id: "edu-master",
    institution: "Faculty of Sciences Semlalia",
    degree: "Master in Information Systems Engineering",
    range: "2024 - Present",
    location: "Marrakech, Morocco",
    summary:
      "Advanced studies in information systems engineering with focus on modern IT solutions and enterprise architecture.",
    focus: ["Information Systems", "Systems Engineering"],
    highlights: [
      "Currently pursuing master's degree",
      "Focus on enterprise-level systems",
    ],
    icon: GraduationCap,
  },
  {
    id: "edu-software",
    institution: "1337 Coding School (42 Network)",
    degree: "Software Engineering Program",
    range: "2021 - Present",
    location: "Khouribga, Morocco",
    summary:
      "Immersive software engineering program with project-based learning and emphasis on practical coding skills.",
    focus: ["Software Engineering", "Systems Programming"],
    highlights: [
      "42 Network peer-to-peer learning methodology",
      "Hands-on project-based curriculum",
    ],
    icon: BookOpen,
  },
  {
    id: "edu-bachelor",
    institution: "Faculty of Sciences",
    degree: "Professional Bachelor's Degree in Database Administration",
    range: "2021 - 2022",
    location: "El Jadida, Morocco",
    summary:
      "Professional program specializing in database systems, administration, and data management.",
    focus: ["Database Administration", "Data Management"],
    highlights: ["Professional bachelor's degree", "Focus on database systems"],
    icon: GraduationCap,
  },
  {
    id: "edu-diploma",
    institution: "Specialized Institute of Applied Technology",
    degree: "Diploma in Computer Development Techniques",
    range: "2019 - 2021",
    location: "Benguerir, Morocco",
    summary:
      "Technical diploma focusing on computer development fundamentals and applied technology practices.",
    focus: ["Computer Development", "Applied Technology"],
    highlights: [
      "Foundation in development techniques",
      "Applied technology focus",
    ],
    icon: GraduationCap,
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
            <motion.div
              key={entry.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
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
                {/* <CardFooter className="text-xs text-primary/70">
                  {entry.note}
                </CardFooter> */}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
