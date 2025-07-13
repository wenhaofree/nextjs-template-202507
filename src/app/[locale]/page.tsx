"use client";

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
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export default function LocaleHomePage() {
  const t = useTranslations('HomePage');

  // 使用平滑滚动 hook
  useSmoothScroll();

  return (
    <>
      <SiteHeader />
      <HeroSection
      badge={{
        text: t('badge.text'),
        action: {
          text: t('badge.action'),
          href: "/pricing",
        },
      }}
      title={t('title')}
      description={t('description')}
      actions={[
        {
          text: t('actions.getStarted'),
          href: "/#pricing",
          variant: "default",
        },
        {
          text: t('actions.readDocs'),
          href: "/docs",
          variant: "outline",
          icon: <Icons.book className="h-5 w-5" />,
        },
        {
          text: t('actions.seeDemo'),
          href: "https://demo.shipsaas.net",
          variant: "link",
          icon: <Icons.play className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "/app-light.png",
        dark: "/app-dark.png",
        alt: t('image.alt'),
      }}
    />

    <section id="tech-stack">
      <TechStack />
    </section>
    <section id="features">
      <FeatureInstruction />
      <AIFeaturesSection />
    <ChatGPTFeaturesSection />
    <FeatureChose />
    </section>
    <section id="pricing">
      <Prices />
    </section>
    <section id="testimonials">
      <Testimonials />
    </section>
    <section id="faq">
      <FAQsFour />
    </section>
    <CallToAction />
    <Footer />
    </>
  )
}