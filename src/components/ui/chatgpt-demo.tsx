"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from '@ai-sdk/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Zap,
  Brain,
  Clock
} from "lucide-react";
import { useTranslations } from 'next-intl';

interface ChatGPTDemoProps {
  className?: string;
}

export function ChatGPTDemo({ className }: ChatGPTDemoProps) {
  const t = useTranslations('ChatGPTDemo');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [selectedExample, setSelectedExample] = useState<string>('');

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m ChatGPT, your AI assistant. I can help you with a wide variety of tasks including answering questions, writing, analysis, math, and more. What would you like to explore today?'
      }
    ],
  });

  // Example prompts to showcase ChatGPT capabilities
  const examplePrompts = [
    {
      category: 'Creative Writing',
      prompt: 'Write a short story about a robot learning to paint',
      icon: Sparkles,
      color: 'bg-primary/10 text-primary'
    },
    {
      category: 'Problem Solving',
      prompt: 'Help me plan a productive morning routine',
      icon: Brain,
      color: 'bg-primary/10 text-primary'
    },
    {
      category: 'Math & Calculation',
      prompt: 'Calculate the compound interest on $1000 at 5% for 10 years',
      icon: Zap,
      color: 'bg-primary/10 text-primary'
    },
    {
      category: 'Information Search',
      prompt: 'What are the latest trends in artificial intelligence?',
      icon: MessageSquare,
      color: 'bg-primary/10 text-primary'
    }
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleExampleClick = (prompt: string) => {
    setSelectedExample(prompt);
    // Simulate typing the example
    const event = new Event('submit', { bubbles: true, cancelable: true });
    handleSubmit(event, { data: { prompt } });
  };

  const formatMessageContent = (content: string) => {
    // Simple formatting for code blocks and lists
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('```')) {
          return <div key={index} className="font-mono text-sm bg-muted p-2 rounded mt-2 mb-2">{line.replace(/```/g, '')}</div>;
        }
        if (line.startsWith('- ')) {
          return <div key={index} className="ml-4">• {line.substring(2)}</div>;
        }
        if (line.startsWith('## ')) {
          return <div key={index} className="font-semibold text-lg mt-3 mb-1">{line.substring(3)}</div>;
        }
        return <div key={index}>{line}</div>;
      });
  };

  return (
    <Card className={`h-[600px] flex flex-col ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          ChatGPT
          <Badge variant="outline" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Experience the power of ChatGPT with real-time conversations, tool usage, and intelligent responses.
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Example Prompts */}
        <div className="grid grid-cols-2 gap-2">
          {examplePrompts.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-auto p-2 text-left justify-start"
                onClick={() => handleExampleClick(example.prompt)}
                disabled={isLoading}
              >
                <div className="flex items-start gap-2 w-full">
                  <div className={`p-1 rounded ${example.color}`}>
                    <IconComponent className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">{example.category}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {example.prompt}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        <Separator />

        {/* Chat Messages */}
        <div ref={scrollAreaRef} className="flex-1 overflow-y-auto pr-4 max-h-80">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="text-sm">
                    {formatMessageContent(message.content)}
                  </div>
                  <div className="flex items-center gap-1 mt-1 opacity-70">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  </div>
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    ChatGPT is thinking...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask ChatGPT anything..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
            Error: {error.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
