"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import { MessageSquare, Zap, Wrench, Bot, Sparkles, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AIFeaturesProps {
  features: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
    demo?: React.ReactNode;
    badge?: string;
  }[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
}

export function AIFeatures({
  features,
  primaryColor = "blue-500",
  progressGradientLight = "bg-gradient-to-r from-blue-400 to-blue-500",
  progressGradientDark = "bg-gradient-to-r from-blue-300 to-blue-400",
}: AIFeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('AIFeatures');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress, features.length]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`text-${primaryColor} font-semibold text-sm uppercase tracking-wider`}
          >
            {t('header.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mt-4 mb-6">
            {t('header.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-center">
          {/* Left Side - Features with Progress Lines */}
          <div
            ref={containerRef}
            className="lg:space-y-8 md:space-x-6 lg:space-x-0 overflow-x-auto overflow-hidden no-scrollbar lg:overflow-visible flex lg:flex lg:flex-col flex-row order-1 pb-4 scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer flex-shrink-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* Progress Line */}
                  {index < features.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200 dark:bg-gray-700 hidden lg:block">
                      {isActive && (
                        <motion.div
                          className={`w-full ${progressGradientLight} dark:${progressGradientDark} rounded-full`}
                          initial={{ height: "0%" }}
                          animate={{ height: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      )}
                    </div>
                  )}

                  {/* Feature Content */}
                  <div
                    className={`
                    flex lg:flex-row flex-col items-start space-x-4 p-3 max-w-sm md:max-w-sm lg:max-w-2xl transition-all duration-300
                    ${
                      isActive
                        ? " bg-white dark:bg-black/80 md:shadow-xl dark:drop-shadow-lg  rounded-xl md:border dark:border-none border-gray-200 "
                        : " "
                    }
                  `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                      p-3 hidden md:block rounded-full transition-all duration-300
                      ${
                        isActive
                          ? `bg-${primaryColor} text-white`
                          : `bg-${primaryColor}/10 dark:bg-black/80 text-${primaryColor}`
                      }
                    `}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3
                          className={`
                          text-lg font-semibold transition-colors duration-300
                          ${
                            isActive
                              ? "text-black dark:text-white"
                              : "text-gray-600 dark:text-gray-400"
                          }
                        `}
                        >
                          {feature.title}
                        </h3>
                        {feature.badge && (
                          <Badge variant="outline" className="text-xs">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      <p
                        className={`
                        text-sm transition-colors duration-300
                        ${
                          isActive
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-gray-500 dark:text-gray-500"
                        }
                      `}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Demo Area */}
          <div className="order-2 lg:order-2">
            <Card className="h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-500" />
                  {features[currentFeature]?.title || 'AI Demo'}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center">
                {features[currentFeature]?.demo || (
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Interactive demo will be available here
                    </p>
                    <Button variant="outline" className="mt-4">
                      Try Demo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
