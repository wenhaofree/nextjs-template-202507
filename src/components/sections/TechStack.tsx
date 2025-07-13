"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Marquee } from "@/components/magicui";
import {
  Zap,
  Shield,
  Database,
  CreditCard,
  Palette,
  Paintbrush,
  Sparkles,
  Building,
  Mail,
  Bot,
  MessageSquare,
  BookOpen,
  Settings,
  Cloud,
  Lock
} from "lucide-react";

// Icon mapping for tech stack
const iconMap = {
  nextjs: Zap,
  betterauth: Shield,
  drizzle: Database,
  stripe: CreditCard,
  shadcn: Palette,
  tailwind: Paintbrush,
  magicui: Sparkles,
  tailark: Building,
  resend: Mail,
  vercel: Bot,
  chatgpt: MessageSquare,
  fumadocs: BookOpen,
  nextinit: Settings,
  prisma: Database,
  neon: Cloud,
  nextauth: Lock
};

// Tech stack data based on the image and project requirements
const techStackData = [
  {
    name: "Next.js",
    description: "The most popular full stack React framework for production.",
    icon: "nextjs" as keyof typeof iconMap,
    category: "Framework",
    color: "from-gray-900 to-black",
    textColor: "text-white",
    bgColor: "bg-black",
    url: "https://nextjs.org"
  },
  {
    name: "Tailwind CSS",
    description: "The CSS framework for rapid UI development.",
    icon: "tailwind" as keyof typeof iconMap,
    category: "Styling",
    color: "from-cyan-500 to-blue-600",
    textColor: "text-white",
    bgColor: "bg-cyan-500",
    url: "https://tailwindcss.com"
  },
  {
    name: "next-intl",
    description: "Internationalization (i18n) library for Next.js with type-safe translations.",
    icon: "nextinit" as keyof typeof iconMap,
    category: "Internationalization",
    color: "from-blue-600 to-blue-800",
    textColor: "text-white",
    bgColor: "bg-blue-600",
    url: "https://next-intl.dev/"
  },
  {
    name: "Prisma",
    description: "Next-generation Node.js and TypeScript ORM for modern applications.",
    icon: "prisma" as keyof typeof iconMap,
    category: "Database",
    color: "from-indigo-600 to-indigo-800",
    textColor: "text-white",
    bgColor: "bg-indigo-600",
    url: "https://prisma.io"
  },
  {
    name: "Neon",
    description: "Serverless Postgres database with branching, bottomless storage and generous free tier.",
    icon: "neon" as keyof typeof iconMap,
    category: "Database",
    color: "from-green-600 to-green-800",
    textColor: "text-white",
    bgColor: "bg-green-600",
    url: "https://neon.tech"
  },
  {
    name: "next-auth",
    description: "Complete open source authentication solution for Next.js applications.",
    icon: "nextauth" as keyof typeof iconMap,
    category: "Authentication",
    color: "from-purple-600 to-purple-800",
    textColor: "text-white",
    bgColor: "bg-purple-600",
    url: "https://next-auth.js.org"
  },
  {
    name: "Stripe",
    description: "The best and most secure online payment service.",
    icon: "stripe" as keyof typeof iconMap,
    category: "Payment",
    color: "from-violet-600 to-violet-800",
    textColor: "text-white",
    bgColor: "bg-violet-600",
    url: "https://stripe.com"
  },
  {
    name: "Shadcn UI",
    description: "Open source components for building modern websites.",
    icon: "shadcn" as keyof typeof iconMap,
    category: "UI Library",
    color: "from-slate-700 to-slate-900",
    textColor: "text-white",
    bgColor: "bg-slate-700",
    url: "https://ui.shadcn.com"
  },
  {
    name: "MagicUI",
    description: "150+ free open source animated components and effects.",
    icon: "magicui" as keyof typeof iconMap,
    category: "Animation",
    color: "from-pink-500 to-rose-600",
    textColor: "text-white",
    bgColor: "bg-pink-500",
    url: "https://magicui.design"
  },
  {
    name: "Tailark",
    description: "Responsive, pre-built Shadcn/UI and Tailwindcss blocks.",
    icon: "tailark" as keyof typeof iconMap,
    category: "Components",
    color: "from-indigo-600 to-purple-700",
    textColor: "text-white",
    bgColor: "bg-indigo-600",
    url: "https://tailark.com"
  },
  {
    name: "Resend",
    description: "The best modern email service for developers.",
    icon: "resend" as keyof typeof iconMap,
    category: "Email",
    color: "from-orange-500 to-red-600",
    textColor: "text-white",
    bgColor: "bg-orange-500",
    url: "https://resend.com"
  },
  {
    name: "Vercel AI SDK",
    description: "The open source AI Toolkit for TypeScript.",
    icon: "vercel" as keyof typeof iconMap,
    category: "AI",
    color: "from-gray-800 to-gray-900",
    textColor: "text-white",
    bgColor: "bg-gray-800",
    url: "https://sdk.vercel.ai"
  },
  {
    name: "ChatGPT",
    description: "The most powerful AI model with API access.",
    icon: "chatgpt" as keyof typeof iconMap,
    category: "AI",
    color: "from-emerald-600 to-teal-700",
    textColor: "text-white",
    bgColor: "bg-emerald-600",
    url: "https://openai.com/chatgpt"
  },
  {
    name: "Fumadocs",
    description: "The best documentation framework for Next.js.",
    icon: "fumadocs" as keyof typeof iconMap,
    category: "Documentation",
    color: "from-violet-600 to-purple-700",
    textColor: "text-white",
    bgColor: "bg-violet-600",
    url: "https://fumadocs.vercel.app"
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

        {/* Tech Stack Marquee */}
        <div className="mb-16">
          <Marquee pauseOnHover className="[--duration:30s]">
            {techStackData.slice(0, 6).map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s] mt-4">
            {techStackData.slice(6).map((tech) => (
              <TechBadge key={tech.name} tech={tech} />
            ))}
          </Marquee>
        </div>

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
    icon: keyof typeof iconMap;
    category: string;
    color: string;
    textColor: string;
    bgColor: string;
    url: string;
  };
  index: number;
}

const TechCard = ({ tech, index }: TechCardProps) => {
  const IconComponent = iconMap[tech.icon];

  const handleClick = () => {
    window.open(tech.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative min-h-[14rem] cursor-pointer"
      onClick={handleClick}
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
              <IconComponent className={cn("h-6 w-6", tech.textColor)} />
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

const TechBadge = ({ tech }: { tech: typeof techStackData[0] }) => {
  const IconComponent = iconMap[tech.icon];

  const handleClick = () => {
    window.open(tech.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="flex items-center gap-3 px-6 py-3 mx-2 rounded-full bg-background border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 min-w-fit cursor-pointer"
      onClick={handleClick}
    >
      <div className={cn(
        "w-8 h-8 rounded-lg border border-border bg-gradient-to-br flex items-center justify-center",
        tech.color
      )}>
        <IconComponent className={cn("h-4 w-4", tech.textColor)} />
      </div>
      <span className="font-medium text-foreground whitespace-nowrap">{tech.name}</span>
      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border whitespace-nowrap">
        {tech.category}
      </span>
    </div>
  );
};
