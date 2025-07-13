'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MailIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogNewsletterProps {
  locale: string;
  className?: string;
  variant?: 'default' | 'inline' | 'sidebar';
}

export function BlogNewsletter({ locale, className, variant = 'default' }: BlogNewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  const texts = {
    title: locale === 'zh' ? '订阅我们的新闻通讯' : 'Subscribe to our newsletter',
    description: locale === 'zh' 
      ? '获取最新的 SaaS 开发技巧、教程和产品更新，直接发送到您的收件箱。'
      : 'Get the latest SaaS development tips, tutorials, and product updates delivered straight to your inbox.',
    placeholder: locale === 'zh' ? '输入您的邮箱' : 'Enter your email',
    subscribe: locale === 'zh' ? '订阅' : 'Subscribe',
    subscribing: locale === 'zh' ? '订阅中...' : 'Subscribing...',
    success: locale === 'zh' ? '订阅成功！' : 'Successfully subscribed!',
    successMessage: locale === 'zh' ? '感谢您的订阅！' : 'Thank you for subscribing!',
  };

  if (variant === 'sidebar') {
    return (
      <div className={cn(
        "rounded-lg border bg-card p-6",
        className
      )}>
        <div className="flex items-center gap-2 mb-4">
          <MailIcon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">
            {locale === 'zh' ? '新闻通讯' : 'Newsletter'}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {locale === 'zh' 
            ? '获取最新的开发技巧和教程。'
            : 'Get the latest development tips and tutorials.'
          }
        </p>

        {isSubscribed ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{texts.success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder={texts.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-sm"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? texts.subscribing : texts.subscribe}
            </Button>
          </form>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn(
        "rounded-lg bg-primary/5 border border-primary/20 p-6",
        className
      )}>
        {isSubscribed ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {texts.success}
            </h3>
            <p className="text-muted-foreground">
              {texts.successMessage}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {texts.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {texts.description}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={texts.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? texts.subscribing : texts.subscribe}
              </Button>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      "rounded-lg bg-muted/50 p-8 text-center",
      className
    )}>
      {isSubscribed ? (
        <div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckIcon className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            {texts.success}
          </h3>
          <p className="text-muted-foreground">
            {texts.successMessage}
          </p>
        </div>
      ) : (
        <div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <MailIcon className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            {texts.title}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {texts.description}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={texts.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? texts.subscribing : texts.subscribe}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
