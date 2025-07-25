"use client";

import { WhyChooseFeatures } from "@/components/ui/why-choose-features";
import { useTranslations } from 'next-intl';
import { Clock, DollarSign, Shield } from "lucide-react";

const FeatureChose = () => {
  const t = useTranslations('WhyChooseShipSaaS');

  const features = [
    {
      id: 1,
      icon: Clock,
      title: t('items.timeToMarket.title'),
      description: t('items.timeToMarket.description'),
      image: "https://bcalabs.org/companions.jpg",
    },
    {
      id: 2,
      icon: DollarSign,
      title: t('items.costEffective.title'),
      description: t('items.costEffective.description'),
      image: "https://bcalabs.org/companions_group_1.jpg",
    },
    {
      id: 3,
      icon: Shield,
      title: t('items.provenReliability.title'),
      description: t('items.provenReliability.description'),
      image: "https://bcalabs.org/companions_group_2.jpg",
    },
  ];

  return (
    <WhyChooseFeatures
      primaryColor="emerald-500"
      progressGradientLight="bg-gradient-to-r from-emerald-400 to-emerald-500"
      progressGradientDark="bg-gradient-to-r from-emerald-300 to-emerald-400"
      features={features}
    />
  );
};

export { FeatureChose };
