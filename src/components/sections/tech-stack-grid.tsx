"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { motion } from "framer-motion";

const techStackData = [
  {
    category: 'frontend',
    icon: Icons.layout,
    items: [
      { name: 'Next.js', version: '15.4.1', description: 'React framework with App Router', isLatest: true },
      { name: 'React', version: '19.1.0', description: 'Latest React with concurrent features', isLatest: true },
      { name: 'TypeScript', version: '5.x', description: 'Type-safe JavaScript', isLatest: true },
      { name: 'TailwindCSS', version: 'v4', description: 'Utility-first CSS framework', isLatest: true },
    ]
  },
  {
    category: 'ui',
    icon: Icons.palette,
    items: [
      { name: 'Radix UI', version: '1.x', description: 'Unstyled, accessible components', isLatest: true },
      { name: 'Framer Motion', version: '12.23.0', description: 'Production-ready motion library', isLatest: true },
      { name: 'Lucide React', version: '0.525.0', description: 'Beautiful & consistent icons', isLatest: true },
      { name: 'next-themes', version: '0.4.6', description: 'Perfect dark mode support', isLatest: true },
    ]
  },
  {
    category: 'backend',
    icon: Icons.server,
    items: [
      { name: 'Prisma', version: '6.11.1', description: 'Next-generation ORM', isLatest: true },
      { name: 'NextAuth.js', version: '4.24.11', description: 'Complete authentication solution', isLatest: true },
      { name: 'Stripe', version: '18.3.0', description: 'Payment processing', isLatest: true },
      { name: 'Resend', version: '4.6.0', description: 'Email API for developers', isLatest: true },
    ]
  },
  {
    category: 'ai',
    icon: Icons.brain,
    items: [
      { name: 'Vercel AI SDK', version: '4.0.0', description: 'Build AI-powered applications', isLatest: true },
      { name: 'OpenAI SDK', version: '1.0.0', description: 'Official OpenAI integration', isLatest: true },
      { name: 'AI React', version: '1.0.0', description: 'React hooks for AI', isLatest: true },
      { name: 'Zod', version: '3.23.8', description: 'TypeScript-first schema validation', isLatest: true },
    ]
  },
  {
    category: 'development',
    icon: Icons.code,
    items: [
      { name: 'Turbopack', version: 'Built-in', description: 'Next.js native bundler', isLatest: true },
      { name: 'ESLint', version: 'Latest', description: 'Code linting and formatting', isLatest: true },
      { name: 'Fumadocs', version: '15.6.3', description: 'Documentation framework', isLatest: true },
      { name: 'PNPM', version: '10.13.1', description: 'Fast, disk space efficient package manager', isLatest: true },
    ]
  },
  {
    category: 'internationalization',
    icon: Icons.globe,
    items: [
      { name: 'next-intl', version: '4.3.4', description: 'Internationalization for Next.js', isLatest: true },
      { name: 'Date-fns', version: '4.1.0', description: 'Modern JavaScript date utility', isLatest: true },
      { name: 'JWT Decode', version: '4.0.0', description: 'JWT token decoding', isLatest: true },
      { name: 'UUID', version: '11.1.0', description: 'RFC4122 UUID generator', isLatest: true },
    ]
  }
];

export function TechStackGrid() {
  const t = useTranslations('TechStackPage');

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {t('grid.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('grid.description')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {techStackData.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`grid.categories.${category.category}.title`)}
                  </CardTitle>
                </div>
                <CardDescription>
                  {t(`grid.categories.${category.category}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{item.name}</span>
                          {item.isLatest && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              {t('grid.latest')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-2 text-xs font-mono">
                        {item.version}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
