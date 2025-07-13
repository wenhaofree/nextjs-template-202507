"use client";

import { Features } from "@/components/ui/features";
import { useTranslations } from 'next-intl';
import { Rocket, Settings, Zap } from "lucide-react";

const FeatureInstruction = () => {
  const t = useTranslations('Features');

  const features = [
    {
      id: 1,
      icon: Rocket,
      title: t('items.rapidDevelopment.title'),
      description: t('items.rapidDevelopment.description'),
      image: "https://bcalabs.org/companions.jpg",
    },
    {
      id: 2,
      icon: Settings,
      title: t('items.scalableArchitecture.title'),
      description: t('items.scalableArchitecture.description'),
      image: "https://bcalabs.org/companions_group_1.jpg",
    },
    {
      id: 3,
      icon: Zap,
      title: t('items.productionReady.title'),
      description: t('items.productionReady.description'),
      image: "https://bcalabs.org/companions_group_2.jpg",
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Features
          primaryColor="sky-500"
          progressGradientLight="bg-gradient-to-r from-sky-400 to-sky-500"
          progressGradientDark="bg-gradient-to-r from-sky-300 to-sky-400"
          features={features}
        />
      </div>
    </div>
  );
};

export { FeatureInstruction };
