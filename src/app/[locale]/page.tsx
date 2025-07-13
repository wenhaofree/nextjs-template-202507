"use client"

import { HeroSection } from "@/components/blocks/hero-section"
import { SiteHeader } from "@/components/sections/site-header"
import { TechStack } from "@/components/sections/TechStack"
import { Icons } from "@/components/ui/icons"
import { Prices } from "@/components/sections/prices"
import { Footer } from "@/components/sections/Footer"

import { FeatureInstruction } from "@/components/sections/feature-instroduction";
import { useTranslations } from 'next-intl';
import { FeatureChose } from "@/components/sections/feature-chose"
import { AIFeaturesSection } from "@/components/sections/ai-features";
import { ChatGPTFeaturesSection } from "@/components/sections/chatgpt-features";
import FAQsFour from "@/components/sections/faqs"
import { Testimonials } from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/call-to-action";

export default function LocaleHomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
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
    <AIFeaturesSection />
    <ChatGPTFeaturesSection />
    <FeatureChose />
    <Prices />
    <Testimonials />
    <FAQsFour />
    <CallToAction />
    </>
  )
}