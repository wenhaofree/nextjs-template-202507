"use client"

import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeroSectionProps {
  badge?: string
  title: string
  subtitle?: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  image?: {
    src: string
    alt: string
  }
  logoCloud?: {
    title: string
    logos: Array<{
      src: string
      alt: string
      href?: string
    }>
  }
}

const HeroSection = ({
  badge,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  logoCloud
}: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          {badge && (
            <div className="mb-8 flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                {badge}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
            {subtitle && (
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {subtitle}
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group" asChild>
              <a href={primaryCta.href}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            
            {secondaryCta && (
              <Button size="lg" variant="outline" className="group" asChild>
                <a href={secondaryCta.href}>
                  <Play className="mr-2 h-4 w-4" />
                  {secondaryCta.text}
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {image && (
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg" />
              <img
                src={image.src}
                alt={image.alt}
                className="relative rounded-lg shadow-2xl"
                width={800}
                height={600}
              />
            </div>
          </div>
        )}

        {/* Logo Cloud */}
        {logoCloud && (
          <div className="mt-20">
            <p className="text-center text-sm font-medium text-muted-foreground">
              {logoCloud.title}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-60">
              {logoCloud.logos.map((logo, index) => (
                <div key={index} className="flex items-center">
                  {logo.href ? (
                    <a href={logo.href} className="transition-opacity hover:opacity-100">
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-8 w-auto"
                      />
                    </a>
                  ) : (
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 w-auto"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection
export type { HeroSectionProps }
