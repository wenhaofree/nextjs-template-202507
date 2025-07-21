"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from '@ai-sdk/react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Trash2,
  Download,
  Copy,
  Settings,
  Zap,
  Brain,
  Calculator,
  Search,
  Code,
  Sun,
  Moon,
  Globe
} from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";

export default function ChatPage() {
  const t = useTranslations('ChatPage');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: t('welcome')
      }
    ],
    body: {
      model: selectedModel
    }
  });

  // Example prompts for quick start
  const examplePrompts = [
    {
      category: t('examples.creative.category'),
      prompt: t('examples.creative.prompt'),
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    },
    {
      category: t('examples.analysis.category'),
      prompt: t('examples.analysis.prompt'),
      icon: Brain,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      category: t('examples.coding.category'),
      prompt: t('examples.coding.prompt'),
      icon: Code,
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    },
    {
      category: t('examples.math.category'),
      prompt: t('examples.math.prompt'),
      icon: Calculator,
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
    },
    {
      category: t('examples.search.category'),
      prompt: t('examples.search.prompt'),
      icon: Search,
      color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    },
    {
      category: t('examples.weather.category'),
      prompt: t('examples.weather.prompt'),
      icon: Sun,
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    }
  ];

  // Available models
  const models = [
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: t('models.gpt4omini') },
    { id: 'gpt-4o', name: 'GPT-4o', description: t('models.gpt4o') },
    { id: 'gpt-4', name: 'GPT-4', description: t('models.gpt4') },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: t('models.gpt35turbo') }
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleExampleClick = (prompt: string) => {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    handleSubmit(event, { data: { prompt } });
  };

  const clearChat = () => {
    window.location.reload();
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const exportChat = () => {
    const chatData = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n\n');
    const blob = new Blob([chatData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatMessageContent = (content: string) => {
    // Enhanced formatting for better display
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('```')) {
        return <div key={index} className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-2 mb-2 overflow-x-auto">{line.replace(/```/g, '')}</div>;
      }
      if (line.startsWith('- ')) {
        return <div key={index} className="ml-4 flex items-start gap-2"><span className="text-blue-500 mt-1">•</span><span>{line.substring(2)}</span></div>;
      }
      if (line.startsWith('## ')) {
        return <div key={index} className="font-semibold text-lg mt-4 mb-2 text-blue-600 dark:text-blue-400">{line.substring(3)}</div>;
      }
      if (line.startsWith('### ')) {
        return <div key={index} className="font-semibold text-base mt-3 mb-1 text-gray-700 dark:text-gray-300">{line.substring(4)}</div>;
      }
      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }
      return <div key={index} className="leading-relaxed">{line}</div>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Zap className="h-3 w-3 mr-1" />
              {t('badges.realtime')}
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              <Brain className="h-3 w-3 mr-1" />
              {t('badges.intelligent')}
            </Badge>
            <Badge variant="outline" className="text-purple-600 border-purple-600">
              <Globe className="h-3 w-3 mr-1" />
              {t('badges.multilingual')}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Examples and Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Examples */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{t('quickStart')}</CardTitle>
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
                      disabled={isLoading}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className={`p-1.5 rounded ${example.color}`}>
                          <IconComponent className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium mb-1">{example.category}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">
                            {example.prompt}
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Model Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {t('settings.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('settings.model')}</label>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-600"
                  >
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {models.find(m => m.id === selectedModel)?.description}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={clearChat}
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    {t('actions.clear')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={exportChat}
                    disabled={messages.length <= 1}
                  >
                    <Download className="h-3 w-3 mr-2" />
                    {t('actions.export')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-green-600" />
                    {t('chatTitle')}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={error ? "destructive" : isLoading ? "secondary" : "default"}>
                      {error ? t('status.error') : isLoading ? t('status.thinking') : t('status.ready')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div ref={scrollAreaRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <div className="text-sm">
                          {formatMessageContent(message.content)}
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 opacity-70">
                          <span className="text-xs">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyMessage(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {message.role === 'user' && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Loader2 className="h-4 w-4 text-green-600 dark:text-green-400 animate-spin" />
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          {t('status.thinking')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={handleInputChange}
                      placeholder={t('inputPlaceholder')}
                      disabled={isLoading}
                      className="flex-1 min-h-[60px] max-h-32 resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                    />
                    <div className="flex flex-col gap-2">
                      <Button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        className="h-[60px] px-4"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                      {isLoading && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={stop}
                          className="px-2"
                        >
                          Stop
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    {t('inputHint')}
                  </div>
                </form>

                {error && (
                  <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    {t('error')}: {error.message}
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
