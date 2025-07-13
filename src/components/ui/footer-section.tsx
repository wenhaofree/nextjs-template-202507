"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Moon, Send, Sun, Globe, MessageCircle, Camera, Briefcase } from "lucide-react"
import { useTranslations } from 'next-intl'

const Footersection = () => {
  const t = useTranslations('Footer')
  const [isDarkMode, setIsDarkMode] = React.useState(true)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{t('newsletter.title')}</h2>
            <p className="mb-6 text-muted-foreground">
              {t('newsletter.description')}
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">{t('newsletter.subscribe')}</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('quickLinks.title')}</h3>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block transition-colors hover:text-primary">
                {t('quickLinks.home')}
              </a>
              <a href="/about" className="block transition-colors hover:text-primary">
                {t('quickLinks.about')}
              </a>
              <a href="/pricing" className="block transition-colors hover:text-primary">
                {t('quickLinks.pricing')}
              </a>
              <a href="/blog" className="block transition-colors hover:text-primary">
                {t('quickLinks.blog')}
              </a>
              <a href="/docs" className="block transition-colors hover:text-primary">
                {t('quickLinks.documentation')}
              </a>
              <a href="/contact" className="block transition-colors hover:text-primary">
                {t('quickLinks.contact')}
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('contact.title')}</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>{t('contact.address')}</p>
              <p>{t('contact.city')}</p>
              <p>{t('contact.phone')}</p>
              <p>{t('contact.email')}</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">{t('social.title')}</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Globe className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social.facebook')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <MessageCircle className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social.twitter')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social.instagram')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Briefcase className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('social.linkedin')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                {t('theme.toggle')}
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/privacy" className="transition-colors hover:text-primary">
              {t('legal.privacy')}
            </a>
            <a href="/terms" className="transition-colors hover:text-primary">
              {t('legal.terms')}
            </a>
            <a href="/cookies" className="transition-colors hover:text-primary">
              {t('legal.cookies')}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footersection }