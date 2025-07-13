"use client";

import { useState, useRef } from "react";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  ImageIcon, 
  Wand2, 
  Download, 
  Copy,
  Settings,
  Sparkles,
  Loader2,
  RefreshCw,
  Heart,
  Share2,
  Palette,
  Camera,
  Brush,
  Zap,
  Star,
  Grid3X3
} from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  liked: boolean;
}

export default function ImageGenerationPage() {
  const t = useTranslations('ImageGenerationPage');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [selectedSize, setSelectedSize] = useState('1024x1024');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Example prompts for inspiration
  const examplePrompts = [
    {
      category: t('examples.nature.category'),
      prompt: t('examples.nature.prompt'),
      icon: Camera,
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    },
    {
      category: t('examples.portrait.category'),
      prompt: t('examples.portrait.prompt'),
      icon: Brush,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    },
    {
      category: t('examples.abstract.category'),
      prompt: t('examples.abstract.prompt'),
      icon: Palette,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      category: t('examples.architecture.category'),
      prompt: t('examples.architecture.prompt'),
      icon: Grid3X3,
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
    },
    {
      category: t('examples.fantasy.category'),
      prompt: t('examples.fantasy.prompt'),
      icon: Sparkles,
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300'
    },
    {
      category: t('examples.scifi.category'),
      prompt: t('examples.scifi.prompt'),
      icon: Zap,
      color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
    }
  ];

  // Style options
  const styles = [
    { id: 'realistic', name: t('styles.realistic'), description: t('styles.realisticDesc') },
    { id: 'artistic', name: t('styles.artistic'), description: t('styles.artisticDesc') },
    { id: 'cartoon', name: t('styles.cartoon'), description: t('styles.cartoonDesc') },
    { id: 'abstract', name: t('styles.abstract'), description: t('styles.abstractDesc') },
    { id: 'vintage', name: t('styles.vintage'), description: t('styles.vintageDesc') },
    { id: 'minimalist', name: t('styles.minimalist'), description: t('styles.minimalistDesc') }
  ];

  // Size options
  const sizes = [
    { id: '1024x1024', name: '1024×1024', description: t('sizes.square') },
    { id: '1024x1792', name: '1024×1792', description: t('sizes.portrait') },
    { id: '1792x1024', name: '1792×1024', description: t('sizes.landscape') }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/image-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          size: selectedSize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      // Add generated image to the list
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: data.imageUrl || '/api/placeholder/512/512', // Fallback for demo
        prompt: prompt.trim(),
        timestamp: new Date(),
        liked: false
      };

      setGeneratedImages(prev => [newImage, ...prev]);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const downloadImage = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  const toggleLike = (imageId: string) => {
    setGeneratedImages(prev =>
      prev.map(img =>
        img.id === imageId ? { ...img, liked: !img.liked } : img
      )
    );
  };

  const regenerateImage = (imagePrompt: string) => {
    setPrompt(imagePrompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ImageIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-purple-600 border-purple-600">
              <Wand2 className="h-3 w-3 mr-1" />
              {t('badges.aiPowered')}
            </Badge>
            <Badge variant="outline" className="text-pink-600 border-pink-600">
              <Sparkles className="h-3 w-3 mr-1" />
              {t('badges.creative')}
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              <Star className="h-3 w-3 mr-1" />
              {t('badges.highQuality')}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Examples and Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Examples */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{t('inspiration')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {examplePrompts.map((example, index) => {
                  const IconComponent = example.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-auto p-3 text-left"
                      onClick={() => handleExampleClick(example.prompt)}
                      disabled={isGenerating}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className={`p-1.5 rounded ${example.color}`}>
                          <IconComponent className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium mb-1">{example.category}</div>
                          <div className="text-xs text-muted-foreground line-clamp-3">
                            {example.prompt}
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {t('settings.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Style Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('settings.style')}</label>
                  <select 
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600"
                  >
                    {styles.map((style) => (
                      <option key={style.id} value={style.id}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {styles.find(s => s.id === selectedStyle)?.description}
                  </p>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('settings.size')}</label>
                  <select 
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600"
                  >
                    {sizes.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.name} - {size.description}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Generation Form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-purple-600" />
                  {t('generator.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('generator.placeholder')}
                    disabled={isGenerating}
                    className="min-h-[100px] resize-none"
                    maxLength={1000}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t('generator.hint')}</span>
                    <span>{prompt.length}/1000</span>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full h-12"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t('generator.generating')}
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      {t('generator.generate')}
                    </>
                  )}
                </Button>

                {error && (
                  <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    {t('error')}: {error}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Images Gallery */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-blue-600" />
                  {t('gallery.title')}
                  {generatedImages.length > 0 && (
                    <Badge variant="secondary">{generatedImages.length}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedImages.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      {t('gallery.empty')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('gallery.emptyHint')}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {generatedImages.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="aspect-square relative group">
                          <img
                            src={image.url}
                            alt={image.prompt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => downloadImage(image.url, image.prompt)}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => copyPrompt(image.prompt)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => regenerateImage(image.prompt)}
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                            {image.prompt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {image.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleLike(image.id)}
                              className={`h-6 w-6 p-0 ${image.liked ? 'text-red-500' : 'text-gray-400'}`}
                            >
                              <Heart className={`h-3 w-3 ${image.liked ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
