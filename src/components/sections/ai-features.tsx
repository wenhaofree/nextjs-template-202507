"use client";

import { AIFeatures } from "@/components/ui/ai-features";
import { useTranslations } from 'next-intl';
import { MessageSquare, Zap, Wrench, Bot, Code, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat, useCompletion } from '@ai-sdk/react';

// Demo Components for each AI feature
const ChatDemo = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      { id: '1', role: 'assistant', content: 'Hello! I can help you with various tasks. Try asking me about the weather, calculations, or search for information!' }
    ],
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 rounded text-sm ${
            msg.role === 'user'
              ? 'bg-blue-100 dark:bg-blue-900 ml-8'
              : 'bg-gray-100 dark:bg-gray-800 mr-8'
          }`}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 dark:bg-gray-800 mr-8 p-2 rounded text-sm">
            <strong>AI:</strong> <span className="animate-pulse">Thinking...</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
};

const TextGenerationDemo = () => {
  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: '/api/completion',
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
        />
        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Text'}
        </Button>
      </form>
      {(completion || isLoading) && (
        <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm overflow-y-auto">
          {isLoading && !completion && <span className="animate-pulse">Generating...</span>}
          {completion && (
            <div className="whitespace-pre-wrap">{completion}</div>
          )}
        </div>
      )}
    </div>
  );
};

const ToolsDemo = () => {
  const [selectedTool, setSelectedTool] = useState('weather');
  const [toolResult, setToolResult] = useState('');

  const tools = {
    weather: 'Get weather information for any city',
    calculator: 'Perform mathematical calculations',
    search: 'Search for information on the web'
  };

  const handleToolCall = () => {
    setToolResult(`Tool "${selectedTool}" executed successfully!\n\nThis is a demo result. In a real implementation, this would call actual tools and return real data.`);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div>
        <select 
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800"
        >
          {Object.entries(tools).map(([key, desc]) => (
            <option key={key} value={key}>{key}: {desc}</option>
          ))}
        </select>
        <Button onClick={handleToolCall} className="mt-2 w-full">
          Call Tool
        </Button>
      </div>
      {toolResult && (
        <div className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm overflow-y-auto">
          {toolResult}
        </div>
      )}
    </div>
  );
};

const AIFeaturesSection = () => {
  const t = useTranslations('AIFeatures');

  const features = [
    {
      id: 1,
      icon: MessageSquare,
      title: t('items.chatInterface.title'),
      description: t('items.chatInterface.description'),
      demo: <ChatDemo />,
      badge: "Interactive"
    },
    {
      id: 2,
      icon: Zap,
      title: t('items.textGeneration.title'),
      description: t('items.textGeneration.description'),
      demo: <TextGenerationDemo />,
      badge: "Streaming"
    },
    {
      id: 3,
      icon: Wrench,
      title: t('items.toolCalling.title'),
      description: t('items.toolCalling.description'),
      demo: <ToolsDemo />,
      badge: "Advanced"
    },
    {
      id: 4,
      icon: Code,
      title: t('items.codeGeneration.title'),
      description: t('items.codeGeneration.description'),
      badge: "Developer"
    },
    {
      id: 5,
      icon: Bot,
      title: t('items.aiAgents.title'),
      description: t('items.aiAgents.description'),
      badge: "Enterprise"
    },
    {
      id: 6,
      icon: Sparkles,
      title: t('items.multiModal.title'),
      description: t('items.multiModal.description'),
      badge: "Premium"
    },
  ];

  return (
    <AIFeatures
      primaryColor="blue-500"
      progressGradientLight="bg-gradient-to-r from-blue-400 to-blue-500"
      progressGradientDark="bg-gradient-to-r from-blue-300 to-blue-400"
      features={features}
    />
  );
};

export { AIFeaturesSection };
