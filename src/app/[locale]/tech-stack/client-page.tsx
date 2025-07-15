"use client";

import { useTranslations } from 'next-intl';
import { SiteHeader } from "@/components/sections/site-header";
import { Footer } from "@/components/sections/Footer";
import { TechStackHero } from "@/components/sections/tech-stack-hero";
import { TechStackGrid } from "@/components/sections/tech-stack-grid";
import { TechStackComparison } from "@/components/sections/tech-stack-comparison";
import { TechStackBenefits } from "@/components/sections/tech-stack-benefits";
import CallToAction from "@/components/sections/call-to-action";

interface TechStackPageProps {
  locale: string;
}

export function TechStackPage({ locale }: TechStackPageProps) {
  const t = useTranslations('TechStackPage');

  return (
    <>
      <SiteHeader />
      
      {/* Hero Section */}
      <TechStackHero />
      
      {/* Tech Stack Grid */}
      <section id="tech-stack-grid" className="py-24 bg-background">
        <TechStackGrid />
      </section>
      
      {/* Version Comparison */}
      <section id="version-comparison" className="py-24 bg-muted/30">
        <TechStackComparison />
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-background">
        <TechStackBenefits />
      </section>
      
      {/* Call to Action */}
      <CallToAction />
      
      <Footer />
    </>
  );
}
