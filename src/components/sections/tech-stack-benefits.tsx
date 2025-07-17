"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { motion } from "framer-motion";

const benefitsData = [
  {
    icon: Icons.zap,
    title: 'performance',
    features: [
      'Turbopack for lightning-fast builds',
      'React 19.1.0 concurrent features',
      'Optimized bundle splitting',
      'Advanced caching strategies'
    ]
  },
  {
    icon: Icons.shield,
    title: 'reliability',
    features: [
      'TypeScript 5.x strict mode',
      'Comprehensive error boundaries',
      'Production-tested components',
      'Automated testing setup'
    ]
  },
  {
    icon: Icons.code,
    title: 'developer',
    features: [
      'Hot module replacement',
      'IntelliSense support',
      'Automated code formatting',
      'Git hooks integration'
    ]
  },
  {
    icon: Icons.rocket,
    title: 'scalability',
    features: [
      'Microservices architecture',
      'Database connection pooling',
      'CDN optimization',
      'Horizontal scaling ready'
    ]
  },
  {
    icon: Icons.globe,
    title: 'modern',
    features: [
      'Latest web standards',
      'Progressive Web App ready',
      'Mobile-first responsive',
      'Accessibility compliant'
    ]
  },
  {
    icon: Icons.users,
    title: 'community',
    features: [
      'Active community support',
      'Regular security updates',
      'Extensive documentation',
      'Best practices included'
    ]
  }
];

export function TechStackBenefits() {
  const t = useTranslations('TechStackPage');

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {t('benefits.title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('benefits.description')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefitsData.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`benefits.items.${benefit.title}.title`)}
                  </CardTitle>
                </div>
                <CardDescription>
                  {t(`benefits.items.${benefit.title}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Icons.check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Future-Proof Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-20"
      >
        <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <Icons.trending className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                {t('benefits.futureProof.title')}
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('benefits.futureProof.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">{t('benefits.futureProof.metrics.compatibility')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">{t('benefits.futureProof.metrics.updates')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">{t('benefits.futureProof.metrics.support')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
