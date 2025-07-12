"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

// Tech stack data based on the image and project requirements
const techStackData = [
  {
    name: "Next.js",
    description: "The most popular full stack React framework for production.",
    icon: "N",
    category: "Framework",
    color: "from-gray-900 to-black",
    textColor: "text-white",
    bgColor: "bg-black"
  },
  {
    name: "BetterAuth",
    description: "The best open source authentication library.",
    icon: "🔐",
    category: "Authentication",
    color: "from-blue-600 to-blue-800",
    textColor: "text-white",
    bgColor: "bg-blue-600"
  },
  {
    name: "Drizzle ORM",
    description: "Lightweight, performant, headless TypeScript ORM.",
    icon: "🌊",
    category: "Database",
    color: "from-green-600 to-green-800",
    textColor: "text-white",
    bgColor: "bg-green-600"
  },
  {
    name: "Stripe",
    description: "The best and most secure online payment service.",
    icon: "S",
    category: "Payment",
    color: "from-purple-600 to-purple-800",
    textColor: "text-white",
    bgColor: "bg-purple-600"
  },
  {
    name: "Shadcn UI",
    description: "Open source components for building modern websites.",
    icon: "//",
    category: "UI Library",
    color: "from-slate-700 to-slate-900",
    textColor: "text-white",
    bgColor: "bg-slate-700"
  },
  {
    name: "Tailwind CSS",
    description: "The CSS framework for rapid UI development.",
    icon: "🎨",
    category: "Styling",
    color: "from-cyan-500 to-blue-600",
    textColor: "text-white",
    bgColor: "bg-cyan-500"
  },
  {
    name: "MagicUI",
    description: "150+ free open source animated components and effects.",
    icon: "✨",
    category: "Animation",
    color: "from-pink-500 to-rose-600",
    textColor: "text-white",
    bgColor: "bg-pink-500"
  },
  {
    name: "Tailark",
    description: "Responsive, pre-built Shadcn/UI and Tailwindcss blocks.",
    icon: "🏗️",
    category: "Components",
    color: "from-indigo-600 to-purple-700",
    textColor: "text-white",
    bgColor: "bg-indigo-600"
  },
  {
    name: "Resend",
    description: "The best modern email service for developers.",
    icon: "R",
    category: "Email",
    color: "from-orange-500 to-red-600",
    textColor: "text-white",
    bgColor: "bg-orange-500"
  },
  {
    name: "Vercel AI SDK",
    description: "The open source AI Toolkit for TypeScript.",
    icon: "🤖",
    category: "AI",
    color: "from-gray-800 to-gray-900",
    textColor: "text-white",
    bgColor: "bg-gray-800"
  },
  {
    name: "ChatGPT",
    description: "The most powerful AI model with API access.",
    icon: "💬",
    category: "AI",
    color: "from-emerald-600 to-teal-700",
    textColor: "text-white",
    bgColor: "bg-emerald-600"
  },
  {
    name: "Fumadocs",
    description: "The best documentation framework for Next.js.",
    icon: "📚",
    category: "Documentation",
    color: "from-violet-600 to-purple-700",
    textColor: "text-white",
    bgColor: "bg-violet-600"
  }
];

export function TechStack() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Theme-aware Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_50%_200px,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(circle_1000px_at_50%_200px,rgba(59,130,246,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_80%_300px,rgba(139,92,246,0.06),transparent)] dark:bg-[radial-gradient(circle_600px_at_80%_300px,rgba(139,92,246,0.1),transparent)]" />

      {/* Theme-aware grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(148,163,184,0.3) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">TECH STACK</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Build with your favorite tech stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Use the latest industry-standard tech stack for your next project
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {techStackData.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TechCardProps {
  tech: {
    name: string;
    description: string;
    icon: string;
    category: string;
    color: string;
    textColor: string;
    bgColor: string;
  };
  index: number;
}

const TechCard = ({ tech, index }: TechCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative min-h-[14rem]"
    >
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 group-hover:shadow-xl group-hover:shadow-blue-500/10 dark:group-hover:shadow-blue-500/20 transition-all duration-300 group-hover:-translate-y-1">
          {/* Theme-aware gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3">
            {/* Icon */}
            <div className={cn(
              "w-fit rounded-lg border-[0.75px] border-border bg-gradient-to-br p-3 group-hover:scale-110 transition-transform duration-300",
              tech.color
            )}>
              <span className={cn("text-xl font-bold", tech.textColor)}>
                {tech.icon}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tech.name}
                </h3>
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                  {tech.category}
                </span>
              </div>
              <p className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {tech.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
