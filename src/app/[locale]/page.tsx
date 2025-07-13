"use client"

import { HeroSection } from "@/components/blocks/hero-section"
import { SiteHeader } from "@/components/sections/site-header"
import { TechStack } from "@/components/sections/TechStack"
import { Icons } from "@/components/ui/icons"
import { CreativePricingDemo } from "@/components/sections/CreativePricingDemo"
import { Footer } from "@/components/sections/Footer"
import { DisplayCardsDemo } from "@/components/sections/DisplayCardsDemo";
import { FeatureInstruction } from "@/components/sections/feature-instroduction";
import { useTranslations } from 'next-intl';
import { FeatureChose } from "@/components/sections/feature-chose"

export default function LocaleHomePage() {
  const t = useTranslations('HomePage');
  return (
    <>

    <SiteHeader />
    

    <HeroSection
      badge={{
        text: t('badge.text'),
        action: {
          text: t('badge.action'),
          href: "/docs",
        },
      }}
      title={t('title')}
      description={t('description')}
      actions={[
        {
          text: t('actions.getStarted'),
          href: "/docs/getting-started",
          variant: "default",
        },
        {
          text: t('actions.github'),
          href: "https://github.com/your-repo",
          variant: "link",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "/app-light.png",
        dark: "/app-dark.png",
        alt: t('image.alt'),
      }}
    />

    <TechStack />
    <FeatureInstruction />
    <FeatureChose />
    {/* <DisplayCardsDemo /> */}
    <CreativePricingDemo />
    <Footer />
    </>
  )
}