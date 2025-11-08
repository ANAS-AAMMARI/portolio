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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: "project-1",
    title: "Project Alpha",
    description:
      "An AI-powered data analysis platform for enterprise solutions.",
    tech: ["Next.js", "Python", "PyTorch", "Kubernetes"],
  },
  {
    id: "project-2",
    title: "Project Beta",
    description:
      "Decentralized cloud storage system with end-to-end encryption.",
    tech: ["Go", "React", "IPFS", "Docker"],
  },
  {
    id: "project-3",
    title: "Project Gamma",
    description:
      "Real-time threat detection engine using machine learning models.",
    tech: ["Rust", "Kafka", "scikit-learn", "GCP"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <h2 className="text-3xl font-bold mb-8 text-primary">
        <span className="text-foreground/80">~/</span>projects $
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => {
          const placeholder = PlaceHolderImages.find(
            (p) => p.id === project.id
          );
          return (
            <Card
              key={project.id}
              className="bg-card/80 border-primary/20 hover:border-primary/60 transition-colors duration-300 flex flex-col"
            >
              <CardHeader>
                {placeholder && (
                  <div className="aspect-video relative mb-4">
                    <Image
                      src={placeholder.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="rounded-t-lg object-cover"
                      data-ai-hint={placeholder.imageHint}
                    />
                  </div>
                )}
                <CardTitle className="text-primary">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Access <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
