"use client";
import {
  BrainCircuit,
  Code,
  Database,
  Globe,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useInView, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";
import { TerminalHeader } from "@/components/ui/terminal-header";

type Skill = {
  name: string;
  icon: LucideIcon;
};

type SkillCategory = {
  name: string;
  tagline: string;
  skills: Skill[];
};

type ThemePalette = {
  base: string;
  glow: string;
  softGlow: string;
  border: string;
  subtle: string;
  accent: string;
};
const DEFAULT_PRIMARY_RAW = "172 67% 45%";
const DEFAULT_THEME_COLORS: ThemePalette =
  buildThemePalette(DEFAULT_PRIMARY_RAW);

function buildThemePalette(rawValue: string): ThemePalette {
  const sanitized = rawValue.replace(/\s+/g, " ").trim();
  const [basePart] = sanitized.split("/");
  const base = basePart || DEFAULT_PRIMARY_RAW;

  return {
    base: `hsl(${base})`,
    glow: `hsl(${base} / 0.55)`,
    softGlow: `hsl(${base} / 0.18)`,
    border: `hsl(${base} / 0.2)`,
    subtle: `hsl(${base} / 0.12)`,
    accent: `hsl(${base} / 0.08)`,
  };
}

const createCardVariants = (glow: string, softGlow: string): Variants => ({
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(12px)",
    boxShadow: "none",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    boxShadow: "none",
    transition: {
      delay: index * 0.18 + 0.3,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
});

const skillData: SkillCategory[] = [
  {
    name: "Programming",
    tagline: "Core languages & paradigms",
    skills: [
      { name: "Python", icon: Code },
      { name: "JavaScript/TS", icon: Code },
      { name: "Java", icon: Code },
      { name: "C++", icon: Code },
      { name: "C", icon: Code },
    ],
  },
  {
    name: "Web Development",
    tagline: "Frontend & Backend development",
    skills: [
      { name: "React / Next.js", icon: Globe },
      { name: "Node.js / NestJS", icon: Globe },
      { name: "Tailwind CSS", icon: Globe },
      { name: "Django", icon: Globe },
      { name: "Spring Boot", icon: Globe },
      { name: "REST & GraphQL APIs", icon: Globe },
    ],
  },
  {
    name: "AI/ML",
    tagline: "Models, data science & ops",
    skills: [
      { name: "PyTorch", icon: BrainCircuit },
      { name: "scikit-learn", icon: BrainCircuit },
      { name: "GenAI", icon: BrainCircuit },
      { name: "Pandas", icon: BrainCircuit },
      { name: "NumPy", icon: BrainCircuit },
      { name: "TensorFlow", icon: BrainCircuit },
    ],
  },
  {
    name: "Cloud & DevOps",
    tagline: "Infrastructure automation & delivery",
    skills: [
      { name: "Docker", icon: Rocket },
      { name: "Kubernetes", icon: Rocket },
      { name: "CI/CD", icon: Rocket },
      { name: "vagrant", icon: Rocket },
      { name: "GitHub Actions", icon: Rocket },
    ],
  },
  {
    name: "Databases",
    tagline: "Storage engines & caching",
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "MySQL", icon: Database },
      { name: "Neo4j", icon: Database },
    ],
  },
  {
    name: "Mobile Development",
    tagline: "iOS & Android apps",
    skills: [
      { name: "React Native", icon: Rocket },
      { name: "Expo", icon: Rocket },
      { name: "Flutter", icon: Rocket },
      { name: "Android Studio", icon: Rocket },
    ],
  },
];

export function Skills() {
  const [bootReady, setBootReady] = useState(false);
  const [themeColors, setThemeColors] =
    useState<ThemePalette>(DEFAULT_THEME_COLORS);

  const cardVariants = useMemo(
    () => createCardVariants(themeColors.glow, themeColors.softGlow),
    [themeColors.glow, themeColors.softGlow]
  );

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const rootStyles = getComputedStyle(document.documentElement);
    const rawPrimary = rootStyles.getPropertyValue("--primary");
    if (!rawPrimary) {
      return;
    }
    setThemeColors(buildThemePalette(rawPrimary));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden py-24 lg:px-2 bg-transparent"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-[-35%] flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.65em] text-primary/10"
          initial={{ y: "0%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />{" "}
      </div>

      <TerminalHeader prompt="~/skills $" onReady={() => setBootReady(true)} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillData.map((category, index) => (
          <SkillCard
            key={category.name}
            category={category}
            index={index}
            bootReady={bootReady}
            variants={cardVariants}
            themeColors={themeColors}
          />
        ))}
      </div>
    </section>
  );
}

type SkillCardProps = {
  category: SkillCategory;
  index: number;
  bootReady: boolean;
  variants: Variants;
  themeColors: ThemePalette;
};

function SkillCard({
  category,
  index,
  bootReady,
  variants,
  themeColors,
}: SkillCardProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const rotateX = useSpring(0, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 20 });
  const [skillsActive, setSkillsActive] = useState(false);

  useEffect(() => {
    if (!bootReady) {
      controls.set("hidden");
      setSkillsActive(false);
    }
  }, [bootReady, controls]);

  useEffect(() => {
    if (!bootReady || !isInView) {
      return;
    }
    controls.start("visible");
    const timer = setTimeout(() => setSkillsActive(true), 250 + index * 90);
    return () => clearTimeout(timer);
  }, [bootReady, isInView, controls, index]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) {
      return;
    }
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const maxTilt = 9;
    rotateX.set((0.5 - y) * maxTilt);
    rotateY.set((x - 0.5) * maxTilt);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/80 p-6 backdrop-blur-sm transition-colors duration-300"
      custom={index}
      variants={variants}
      initial="hidden"
      animate={controls}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        borderColor: themeColors.border,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        borderColor: themeColors.base,
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle at 20% 20%, ${themeColors.subtle}, transparent 55%), radial-gradient(circle at 80% 20%, ${themeColors.accent}, transparent 60%)`,
        }}
      />
      <motion.h3
        className="text-xl font-bold"
        style={{ color: themeColors.base }}
        animate={{
          textShadow: [
            `0 0 0 ${themeColors.softGlow}`,
            `0 0 18px ${themeColors.glow}`,
            `0 0 6px ${themeColors.softGlow}`,
          ],
        }}
        transition={{
          duration: 4.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1.2,
        }}
      >
        {category.name}
      </motion.h3>
      <span
        className="-translate-y-1 mb-4 block text-xs uppercase tracking-[0.35em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-80"
        style={{ color: themeColors.glow }}
      >
        {category.tagline}
      </span>
      <motion.ul className="space-y-3">
        {category.skills.map((skill, skillIndex) => {
          const IconComponent = skill.icon;
          return (
            <motion.li
              key={skill.name}
              className="group/icon flex items-center text-foreground/80"
              animate={
                skillsActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }
              }
              transition={{
                delay: 0.2 + skillIndex * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <motion.span
                className="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  borderColor: themeColors.border,
                  backgroundColor: themeColors.subtle,
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 3 + skillIndex * 0.04,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  rotate: 360,
                  transition: {
                    duration: 1.6,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }}
                whileTap={{ scale: 0.92 }}
              >
                <IconComponent
                  className="h-4 w-4"
                  style={{ color: themeColors.base }}
                />
              </motion.span>
              <span className="relative">
                {skill.name}
                <span
                  className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover/icon:scale-x-100"
                  style={{ backgroundColor: themeColors.glow }}
                />
              </span>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
}
