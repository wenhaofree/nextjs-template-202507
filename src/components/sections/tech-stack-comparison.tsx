"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { motion } from "framer-motion";

const comparisonData = [
  {
    technology: 'Next.js',
    shipsaas: '15.4.1',
    others: '13.x - 14.x',
    advantages: [
      'App Router with full stability',
      'Turbopack for faster builds',
      'Server Components optimization',
      'Enhanced middleware support'
    ]
  },
  {
    technology: 'TailwindCSS',
    shipsaas: 'v4 (Latest)',
    others: 'v3.x',
    advantages: [
      'Native CSS support',
      'Improved performance',
      'Better IntelliSense',
      'Simplified configuration'
    ]
  },
  {
    technology: 'React',
    shipsaas: '19.1.0',
    others: '17.x - 18.x',
    advantages: [
      'Concurrent features',
      'Automatic batching',
      'Suspense improvements',
      'Better TypeScript support'
    ]
  },
  {
    technology: 'TypeScript',
    shipsaas: '5.x',
    others: '4.x',
    advantages: [
      'Improved type inference',
      'Better performance',
      'Enhanced decorators',
      'Stricter type checking'
    ]
  },
  {
    technology: 'Prisma',
    shipsaas: '6.11.1',
    others: '4.x - 5.x',
    advantages: [
      'Enhanced query performance',
      'Better TypeScript integration',
      'Improved schema validation',
      'Advanced connection pooling'
    ]
  },
  {
    technology: 'Vercel AI SDK',
    shipsaas: '4.0.0',
    others: '2.x - 3.x',
    advantages: [
      'Streaming support',
      'Better error handling',
      'Enhanced React hooks',
      'Improved type safety'
    ]
  }
];

export function TechStackComparison() {
  const t = useTranslations('TechStackPage');

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {t('comparison.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('comparison.description')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {comparisonData.map((item, index) => (
          <motion.div
            key={item.technology}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Icons.zap className="h-5 w-5 text-primary" />
                    {item.technology}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className="bg-green-500 text-white">
                      {item.shipsaas}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{t('comparison.others')}:</span>
                    <Badge variant="outline" className="text-muted-foreground">
                      {item.others}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-primary">
                    {t('comparison.advantages')}:
                  </h4>
                  <ul className="space-y-2">
                    {item.advantages.map((advantage, advIndex) => (
                      <li key={advIndex} className="flex items-start gap-2 text-sm">
                        <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">
              {t('comparison.performance.title')}
            </CardTitle>
            <CardDescription className="text-base">
              {t('comparison.performance.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50%</div>
                <div className="text-sm text-muted-foreground">{t('comparison.metrics.buildTime')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">30%</div>
                <div className="text-sm text-muted-foreground">{t('comparison.metrics.bundleSize')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <div className="text-sm text-muted-foreground">{t('comparison.metrics.loadTime')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <div className="text-sm text-muted-foreground">{t('comparison.metrics.devExperience')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
