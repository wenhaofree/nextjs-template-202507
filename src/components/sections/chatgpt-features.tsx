"use client";

import { useTranslations } from 'next-intl';
import { ChatGPTDemo } from "@/components/ui/chatgpt-demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Brain,
  Zap,
  Globe,
  Code,
  Lightbulb,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";

const ChatGPTFeaturesSection = () => {
  const t = useTranslations('ChatGPTFeatures');

  const features = [
    {
      icon: MessageSquare,
      title: t('features.conversational.title'),
      description: t('features.conversational.description'),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: Brain,
      title: t('features.intelligent.title'),
      description: t('features.intelligent.description'),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: Zap,
      title: t('features.realtime.title'),
      description: t('features.realtime.description'),
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      icon: Globe,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.description'),
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      icon: Code,
      title: t('features.coding.title'),
      description: t('features.coding.description'),
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    },
    {
      icon: Lightbulb,
      title: t('features.creative.title'),
      description: t('features.creative.description'),
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    }
  ];

  const capabilities = [
    {
      category: t('capabilities.analysis.category'),
      items: [
        t('capabilities.analysis.items.0'),
        t('capabilities.analysis.items.1'),
        t('capabilities.analysis.items.2')
      ]
    },
    {
      category: t('capabilities.creation.category'),
      items: [
        t('capabilities.creation.items.0'),
        t('capabilities.creation.items.1'),
        t('capabilities.creation.items.2')
      ]
    },
    {
      category: t('capabilities.assistance.category'),
      items: [
        t('capabilities.assistance.items.0'),
        t('capabilities.assistance.items.1'),
        t('capabilities.assistance.items.2')
      ]
    }
  ];

  return (
    <div className="py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header - More compact */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="text-green-600 border-green-600 mb-3">
            <Star className="h-3 w-3 mr-1" />
            {t('header.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            {t('header.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>

        {/* Main Content - Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Interactive Demo */}
          <div className="lg:col-span-5 lg:row-span-2">
            <Card className="h-full overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <ChatGPTDemo />
              </CardContent>
            </Card>
          </div>

          {/* Top Right - Feature Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {features.slice(0, 3).map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group hover:-translate-y-1 transition-transform duration-200">
                    <Card className="h-full border shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className={`p-2 rounded-lg ${feature.bgColor} ${feature.color} mb-2`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h4 className="font-semibold text-black dark:text-white">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Right - Feature Grid Continued */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {features.slice(3).map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group hover:-translate-y-1 transition-transform duration-200">
                    <Card className="h-full border shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className={`p-2 rounded-lg ${feature.bgColor} ${feature.color} mb-2`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h4 className="font-semibold text-black dark:text-white">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capabilities Section - Horizontal Cards */}
          <div className="lg:col-span-12 mt-4">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4">
              {t('sections.capabilities')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {capabilities.map((capability, index) => (
                <div key={index} className="group hover:-translate-y-1 transition-transform duration-200">
                  <Card className="h-full border shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{capability.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {capability.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Info - Full Width Banner */}
          <div className="lg:col-span-12 mt-2">
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black dark:text-white text-xl mb-2">
                        {t('integration.title')}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 max-w-xl">
                        {t('integration.description')}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">OpenAI API</Badge>
                        <Badge variant="secondary">Vercel AI SDK</Badge>
                        <Badge variant="secondary">Real-time Streaming</Badge>
                        <Badge variant="secondary">Tool Integration</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button className="group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ChatGPTFeaturesSection };
