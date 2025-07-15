"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { BorderBeam } from "@/components/magicui";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 避免水合错误
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在服务端渲染时使用默认的light主题图片
  const imageSrc = mounted
    ? (resolvedTheme === "light" ? image.light : image.dark)
    : image.light;

  return (
    <section
      className={cn(
        "bg-background text-foreground relative",
        "section-padding-lg",
        "fade-bottom overflow-hidden pb-0 min-h-screen flex items-center"
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-background/50 dark:from-blue-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/10" />
      <div className="mx-auto flex max-w-container flex-col gap-16 pt-20 sm:gap-20 w-full">
        <div className="flex flex-col items-center gap-8 text-center sm:gap-12">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2 bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200 text-orange-800 hover:from-orange-200 hover:to-orange-100 dark:from-orange-950 dark:to-orange-900 dark:border-orange-800 dark:text-orange-200">
              <span className="font-medium">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1 font-semibold hover:gap-2 transition-all duration-200">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear-normal bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight [animation-fill-mode:both]">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg relative z-10 max-w-[600px] animate-appear-normal font-normal text-muted-foreground leading-relaxed sm:text-xl [animation-fill-mode:both]" style={{ animationDelay: '100ms' }}>
            {description}
          </p>

          {/* Actions */}
          <div className="relative z-10 flex animate-appear-normal justify-center gap-4 [animation-fill-mode:both]" style={{ animationDelay: '300ms' }}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="lg"
                className={cn(
                  action.variant === "default" && "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-base",
                  action.variant === "link" && "text-muted-foreground hover:text-foreground font-medium"
                )}
                asChild
              >
                <a href={action.href} className="flex items-center gap-2">
                  {action.icon}
                  {action.text}
                </a>
              </Button>
            ))}
          </div>

          {/* User Testimonials */}
          {/* <div className="relative z-10 flex animate-appear-normal flex-col items-center gap-4 pt-8 [animation-fill-mode:both]" style={{ animationDelay: '400ms' }}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-500 dark:border-gray-800"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-${1500000000000 + i * 100000000}?w=40&h=40&fit=crop&crop=face)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ))}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-semibold text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
                90+
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              90+ makers ship faster with ShipSaaS
            </p>
          </div> */}

          {/* Image with Glow */}
          <div className="relative pt-16">
            <div className="relative mx-auto max-w-5xl">
              <MockupFrame
                className="animate-appear-slow relative [animation-fill-mode:both] shadow-2xl"
                style={{ animationDelay: '700ms' }}
                size="small"
              >
                <Mockup type="responsive">
                  <Image
                    src={imageSrc}
                    alt={image.alt}
                    width={1248}
                    height={765}
                    priority
                    className="rounded-lg"
                  />
                </Mockup>
                <BorderBeam size={250} duration={12} delay={9} />
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom-slow [animation-fill-mode:both]"
                style={{ animationDelay: '1000ms' }}
              />
              {/* Additional glow effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl opacity-30 animate-appear-zoom-slow [animation-fill-mode:both]" style={{ animationDelay: '1200ms' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
