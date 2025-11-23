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
import { projects } from "@/lib/projects";

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
      className="py-12 md:py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
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
                  viewport={{ once: true, margin: "-50px" }}
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
