import { BrainCircuit, Code, Database, Globe, Rocket, ShieldCheck } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

type Skill = {
  name: string;
  icon: LucideIcon;
};

type SkillCategory = {
  name: string;
  skills: Skill[];
};

const skillData: SkillCategory[] = [
  {
    name: "Programming",
    skills: [
      { name: "Python", icon: Code },
      { name: "JavaScript/TS", icon: Code },
      { name: "Go", icon: Code },
      { name: "Rust", icon: Code },
    ],
  },
  {
    name: "Web Dev",
    skills: [
      { name: "React/Next.js", icon: Globe },
      { name: "Node.js", icon: Globe },
      { name: "Tailwind CSS", icon: Globe },
      { name: "GraphQL", icon: Globe },
    ],
  },
  {
    name: "AI/ML",
    skills: [
      { name: "PyTorch", icon: BrainCircuit },
      { name: "scikit-learn", icon: BrainCircuit },
      { name: "GenAI", icon: BrainCircuit },
      { name: "Pandas", icon: BrainCircuit },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: Rocket },
      { name: "Kubernetes", icon: Rocket },
      { name: "GCP/AWS", icon: Rocket },
      { name: "Terraform", icon: Rocket },
    ],
  },
  {
    name: "Databases",
    skills: [
        { name: "PostgreSQL", icon: Database },
        { name: "MongoDB", icon: Database },
        { name: "Redis", icon: Database },
        { name: "Firebase", icon: Database },
    ],
  },
  {
    name: "Security",
    skills: [
        { name: "Network Security", icon: ShieldCheck },
        { name: "AppSec", icon: ShieldCheck },
        { name: "Pentesting", icon: ShieldCheck },
        { name: "Cryptography", icon: ShieldCheck },
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <h2 className="text-3xl font-bold mb-8 text-primary">
        <span className="text-foreground/80">~/</span>skills $
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillData.map((category) => (
          <div key={category.name} className="bg-card border-primary/20 border p-6 rounded-lg hover:border-primary/60 transition-colors duration-300">
            <h3 className="text-xl font-bold text-primary mb-4">{category.name}</h3>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li key={skill.name} className="flex items-center text-foreground/80">
                  <skill.icon className="h-4 w-4 mr-3 text-accent" />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
