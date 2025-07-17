"use client";

import { useTranslations } from 'next-intl';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { motion } from "framer-motion";

export function TechStackHero() {
  const t = useTranslations('TechStackPage');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-32 pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              <Icons.zap className="mr-2 h-4 w-4" />
              {t('hero.badge')}
            </Badge>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              {t('hero.title.part1')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t('hero.title.part2')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Version Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 flex flex-wrap justify-center gap-4"
          >
            {[
              { name: 'Next.js', version: '15.4.1', color: 'bg-black dark:bg-white text-white dark:text-black' },
              { name: 'TailwindCSS', version: 'v4', color: 'bg-cyan-500 text-white' },
              { name: 'React', version: '19.1.0', color: 'bg-blue-500 text-white' },
              { name: 'TypeScript', version: '5.x', color: 'bg-blue-600 text-white' },
            ].map((tech, index) => (
              <Badge
                key={tech.name}
                className={`px-4 py-2 text-sm font-semibold ${tech.color}`}
              >
                {tech.name} {tech.version}
              </Badge>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="px-8 py-3 text-lg" onClick={() => window.open('https://shipsaas.net/#pricing', '_blank')}>
              <Icons.download className="mr-2 h-5 w-5" />
              {t('hero.cta.primary')}
            </Button>
            {/* <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              <Icons.github className="mr-2 h-5 w-5" />
              {t('hero.cta.secondary')}
            </Button> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
