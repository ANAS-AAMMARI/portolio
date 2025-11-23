"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TerminalHeader } from "@/components/ui/terminal-header";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const projects = [
  {
    id: "project-1",
    title: "Next.js Portfolio",
    description:
      "A modern and dynamic personal portfolio featuring rich animations, and a smooth user browsing experience.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "Radix UI",
    ],
    repo: "https://github.com/ANAS-AAMMARI/portolio",
  },
  {
    id: "project-2",
    title: "World Cup 2030 Platform",
    description:
      "A large-scale platform built to support the fan experience for the 2030 FIFA World Cup in Morocco, offering intuitive navigation and seamless user workflows.",
    tech: [
      "Next.js 15",
      "Spring Boot",
      "Java 21",
      "TypeScript",
      "MUI (Material UI)",
      "Tailwind CSS",
      "MySQL",
      "JWT Auth",
    ],
    repo: "https://github.com/Fhamza03/WorldCup",
  },
  {
    id: "project-3",
    title: "DaintyMeal",
    description:
      "A mobile application that helps users explore nearby restaurants and place food orders through an optimized and user-friendly interface.",
    tech: ["React Native", "Expo", "TypeScript", "React Navigation", "Axios"],
    repo: "https://github.com/ANAS-AAMMARI/daintymeal",
  },
  {
    id: "project-4",
    title: "Linear Regression Engine",
    description:
      "A custom-built machine learning tool that performs predictive modeling and provides insightful data visualizations.",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib"],
    repo: "https://github.com/ANAS-AAMMARI/ft_linear_regression",
  },
  {
    id: "project-5",
    title: "Cinema Booking Security Audit",
    description:
      "A complete cinema booking system designed to highlight and analyze common security flaws in web applications.",
    tech: ["PHP", "JavaScript", "HTML5", "CSS/Less"],
    repo: "https://github.com/ANAS-AAMMARI/cinema-booking",
  },
  {
    id: "project-6",
    title: "Spring Boot Chat Room",
    description:
      "A real-time chat application offering smooth communication and persistent message storage with a clean interface.",
    tech: [
      "Java 17",
      "Spring Boot",
      "WebSockets",
      "Thymeleaf",
      "MySQL",
      "Spring Data JPA",
    ],
    repo: "https://github.com/ANAS-AAMMARI/chatRoom_Java",
  },
  {
    id: "project-7",
    title: "Internship Evaluation Platform",
    description:
      "A platform designed to streamline the evaluation process for academic internships, providing a clear and efficient experience for both students and supervisors.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Java",
      "Tailwind CSS",
      "Radix UI",
      "Axios",
    ],
    repo: "https://github.com/abdellatifabb/internshipEvaluationBackEnd",
  },
  {
    id: "project-8",
    title: "ft_transcendence (Pong MMO)",
    description:
      "A multiplayer gaming platform that blends real-time matches, social features, and live communication in a single interactive experience.",
    tech: [
      "Next.js 14",
      "NestJS",
      "TypeScript",
      "Socket.io",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
    ],
    repo: "https://github.com/rmerzak/ft_transcendence",
  },
  {
    id: "project-9",
    title: "Recommendation System",
    description:
      "A backend project that generates intelligent suggestions by analyzing user and content patterns.",
    tech: ["PHP"],
    repo: "https://github.com/ANAS-AAMMARI/RS-project",
  },
  {
    id: "project-10",
    title: "Social Distancing Detector",
    description:
      "A computer vision solution that analyzes video feeds to identify distance violations during the COVID-19 pandemic.",
    tech: ["Python", "OpenCV", "Jupyter Notebook"],
    repo: "https://github.com/ANAS-AAMMARI/COVID-19-Social-Distancing-Detector",
  },
  {
    id: "project-11",
    title: "FT_IRC Server",
    description:
      "A full IRC communication server supporting multiple users, channels, commands, and real-time messaging.",
    tech: ["C++", "Socket Programming", "Makefile"],
    repo: "https://github.com/ANAS-AAMMARI/IRC",
  },
  {
    id: "project-12",
    title: "Inception Infrastructure",
    description:
      "A containerized infrastructure project that assembles a secure, isolated, and production-like environment for web services.",
    tech: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "WordPress",
      "MariaDB",
      "Shell Scripting",
    ],
    repo: "https://github.com/ANAS-AAMMARI/inception-final",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
} satisfies Variants;

const headingVariants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
} satisfies Variants;

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 18 },
  },
} satisfies Variants;

const cardStackVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
} satisfies Variants;

const cardItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
} satisfies Variants;

const mediaVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
} satisfies Variants;

const badgeVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
} satisfies Variants;

export function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <TerminalHeader
        prompt="~/projects $"
        variants={headingVariants}
        className="flex items-center text-3xl font-bold mb-8 text-primary"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          const placeholder = PlaceHolderImages.find(
            (p) => p.id === project.id
          );
          return (
            <motion.div key={project.id} variants={cardVariants}>
              <Card className="bg-card/80 border-primary/20 hover:border-primary/60 transition-colors duration-300 flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                <motion.div
                  className="flex h-full flex-col"
                  variants={cardStackVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                >
                  <CardHeader className="space-y-4">
                    {placeholder && (
                      <motion.div
                        variants={mediaVariants}
                        className="aspect-video relative mb-4"
                      >
                        <Image
                          src={placeholder.imageUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="rounded-t-lg object-cover"
                          data-ai-hint={placeholder.imageHint}
                        />
                      </motion.div>
                    )}
                    <motion.div variants={cardItemVariants}>
                      <CardTitle className="text-primary">
                        {project.title}
                      </CardTitle>
                    </motion.div>
                    <motion.div variants={cardItemVariants}>
                      <CardDescription>{project.description}</CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={cardStackVariants}
                    >
                      {project.tech.map((tech) => (
                        <motion.div key={tech} variants={badgeVariants}>
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" variants={cardItemVariants}>
                      <Button
                        onClick={() => window.open(project.repo, "_blank")}
                        variant="outline"
                        className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        Access <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </CardFooter>
                </motion.div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
