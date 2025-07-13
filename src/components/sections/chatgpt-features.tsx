"use client";

import { useTranslations } from 'next-intl';
import { ChatGPTDemo } from "@/components/ui/chatgpt-demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Brain, 
  Zap, 
  Globe, 
  Code, 
  Lightbulb,
  CheckCircle,
  Star
} from "lucide-react";

const ChatGPTFeaturesSection = () => {
  const t = useTranslations('ChatGPTFeatures');

  const features = [
    {
      icon: MessageSquare,
      title: t('features.conversational.title'),
      description: t('features.conversational.description'),
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Brain,
      title: t('features.intelligent.title'),
      description: t('features.intelligent.description'),
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: Zap,
      title: t('features.realtime.title'),
      description: t('features.realtime.description'),
      color: "text-yellow-600 dark:text-yellow-400"
    },
    {
      icon: Globe,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.description'),
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Code,
      title: t('features.coding.title'),
      description: t('features.coding.description'),
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Lightbulb,
      title: t('features.creative.title'),
      description: t('features.creative.description'),
      color: "text-orange-600 dark:text-orange-400"
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
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Star className="h-3 w-3 mr-1" />
              {t('header.badge')}
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            {t('header.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Interactive Demo */}
          <div className="order-2 lg:order-1">
            <ChatGPTDemo />
          </div>

          {/* Right Side - Features and Capabilities */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Key Features */}
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                {t('sections.features')}
              </h3>
              <div className="grid gap-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${feature.color}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-black dark:text-white mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                {t('sections.capabilities')}
              </h3>
              <div className="space-y-6">
                {capabilities.map((capability, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{capability.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {capability.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Integration Info */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      {t('integration.title')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ChatGPTFeaturesSection };
