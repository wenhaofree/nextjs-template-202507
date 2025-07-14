"use client";

import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";
import { useTranslations } from 'next-intl';
import { Rocket, Star, Crown } from "lucide-react";

const Prices = () => {
  const t = useTranslations('Pricing');

  const tiers: PricingTier[] = [
    {
      name: t('tiers.starter.name'),
      icon: <Rocket className="w-6 h-6" />,
      price: parseInt(t('tiers.starter.price')),
      originalPrice: parseInt(t('tiers.starter.originalPrice')),
      discount: parseInt(t('tiers.starter.discount')),
      description: t('tiers.starter.description'),
      color: "blue",
      features: t.raw('tiers.starter.features') as string[],
    },
    {
      name: t('tiers.professional.name'),
      icon: <Star className="w-6 h-6" />,
      price: parseInt(t('tiers.professional.price')),
      originalPrice: parseInt(t('tiers.professional.originalPrice')),
      discount: parseInt(t('tiers.professional.discount')),
      description: t('tiers.professional.description'),
      color: "purple",
      features: t.raw('tiers.professional.features') as string[],
      popular: true,
    },
    {
      name: t('tiers.enterprise.name'),
      icon: <Crown className="w-6 h-6" />,
      price: parseInt(t('tiers.enterprise.price')),
      originalPrice: parseInt(t('tiers.enterprise.originalPrice')),
      discount: parseInt(t('tiers.enterprise.discount')),
      description: t('tiers.enterprise.description'),
      color: "amber",
      features: t.raw('tiers.enterprise.features') as string[],
    },
  ];

  return (
    <CreativePricing
      tag={t('header.tag')}
      title={t('header.title')}
      description={t('header.description')}
      tiers={tiers}
    />
  );
};

export { Prices }

