"use client";

import { motion } from "framer-motion";
import { TerminalHeader } from "@/components/ui/terminal-header";

const experienceLog = [
  {
    id: "exp-onedustry",
    company: "Onedustry Technologies",
    position: "Mobile Developer Intern",
    range: "July 2024 - January 2025",
    location: "Remote, Morocco",
    summary:
      "Developed cross-platform mobile applications with focus on performance optimization and user experience.",
    projects: [
      {
        name: "DaintyMeal",
        description:
          "Develop a cross-platform mobile app that allows users to discover and order from local restaurants. Used Context API for state management and optimized performance to ensure a smooth user experience.",
      },
    ],
    technologies: [
      "React Native",
      "Expo",
      "JavaScript",
      "TypeScript",
      "Context API",
      "REST APIs",
      "Git",
    ],
  },
  {
    id: "exp-agriedge",
    company: "AgriEdge - UM6P",
    position: "Front-End Developer Intern",
    range: "July 2022 - October 2022",
    location: "Benguerir, Morocco",
    summary:
      "Developed web platform for agricultural management with interactive mapping and real-time data visualization.",
    projects: [
      {
        name: "Agricultural Mapping Platform",
        description:
          "Develop a web platform for managing and visualizing agricultural plots. Integrated interactive maps enable users to view, manage, and access detailed data about each plot. Implemented OpenWeather API integration to display real-time weather data for each area, enhancing agricultural decision-making.",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "GraphQL",
      "Apollo Client",
      "Tailwind CSS",
      "Leaflet/Mapbox",
      "OpenWeather API",
      "Git",
    ],
  },
  {
    id: "exp-mined",
    company: "Ministry of National Education Delegation",
    position: "LMS Developer Intern",
    range: "July 2021",
    location: "Benguerir, Morocco",
    summary:
      "Developed and configured an online learning platform to support remote education with customized features.",
    projects: [
      {
        name: "E-Learning Platform",
        description:
          "Develop and configure an online learning platform based on Moodle to support remote education. Customize the UI, set up course modules, and implement assessment and student tracking features to enhance the learning experience.",
      },
    ],
    technologies: ["Moodle LMS", "PHP", "MySQL", "HTML/CSS", "JavaScript"],
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
            key={entry.id}
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

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-xl font-bold text-foreground">
                  {entry.position}
                </h3>
                <p className="text-sm text-primary/80 font-semibold">
                  {entry.range}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {entry.company}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>{entry.location}</span>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {entry.summary}
              </p>

              {entry.projects && entry.projects.length > 0 && (
                <div className="mt-4 space-y-2">
                  {entry.projects.map((project, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="font-semibold text-foreground text-sm">
                        • {project.name}
                      </p>
                      <p className="text-muted-foreground text-sm ml-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {entry.technologies && entry.technologies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
