"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Send,
  Globe,
  MessageCircle,
  Users,
  Mail,
  Brain
} from "lucide-react"
import { useTranslations } from 'next-intl'

const Footersection = () => {
  const t = useTranslations('Footer')

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/5 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company branding section */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg mr-3 group-hover:scale-105 transition-transform duration-300">
                <Brain className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">ShipSaaS</h2>
            </div>
            <p className="mb-6 text-muted-foreground max-w-sm">
              ShipSaaS is a NextJS boilerplate for building AI SaaS startups. Ship Fast with a variety of templates and components.
            </p>

            {/* Newsletter subscription form with improved styling */}
            <div className="relative max-w-md">
              <h3 className="text-sm font-medium mb-2">{t('newsletter.title') || 'Subscribe to our newsletter'}</h3>
              <div className="relative">
                <Input
                  type="email"
                  placeholder={t('newsletter.placeholder') || 'Enter your email'}
                  className="pr-12 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">{t('newsletter.subscribe') || 'Subscribe'}</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Decorative element */}
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          {/* About section with improved styling */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <nav className="space-y-2">
              <a href="/#features" className="flex items-center text-sm group transition-colors hover:text-primary">
                <span className="relative overflow-hidden">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">Features</span>
                </span>
              </a>
              <a href="/#pricing" className="flex items-center text-sm group transition-colors hover:text-primary">
                <span className="relative overflow-hidden">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">Pricing</span>
                </span>
              </a>
            </nav>
          </div>

          {/* Resources section with improved styling */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <nav className="space-y-2">
              <a href="/docs" className="flex items-center text-sm group transition-colors hover:text-primary">
                <span className="relative overflow-hidden">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">Documents</span>
                </span>
              </a>
              <a href="/blog" className="flex items-center text-sm group transition-colors hover:text-primary">
                <span className="relative overflow-hidden">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">Blog</span>
                </span>
              </a>
            </nav>
          </div>
          {/* Contact section with improved styling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <address className="not-italic">
              <a
                href="mailto:hello@shipsaas.net"
                className="flex items-center text-sm transition-colors hover:text-primary mb-3 group"
              >
                <Mail className="h-4 w-4 mr-2 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="relative overflow-hidden">
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                    hello@shipsaas.net
                  </span>
                </span>
              </a>
            </address>

            <div className="flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/10 hover:text-primary">
                      <MessageCircle className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/10 hover:text-primary">
                      <Globe className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Star us on GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/10 hover:text-primary">
                      <Users className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Copyright and legal links with improved styling */}
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col items-center justify-between gap-3 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 • ShipSaaS All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm">
            <a href="/privacy" className="text-muted-foreground transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground transition-colors hover:text-primary">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footersection }