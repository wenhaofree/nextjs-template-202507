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
    <footer className="relative bg-background border-t border-border/40">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-12 mb-8">
          {/* Company branding section - Takes more space */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg mr-3 transition-transform hover:scale-105">
                <Brain className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">ShipSaaS</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Make Your AI SaaS Product in a Weekend
            </p>

            {/* Newsletter subscription form */}
            <div className="max-w-sm">
              <h3 className="text-sm font-semibold mb-2 text-foreground">{t('newsletter.title') || 'Stay Connected'}</h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t('newsletter.placeholder') || 'Enter your email'}
                  className="flex-1 h-9 text-sm bg-background/50 border-border/60 focus:border-primary/60"
                />
                <Button size="sm" className="px-4 bg-primary hover:bg-primary/90 transition-colors">
                  <Send className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
          {/* Navigation Links - Organized in columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">PRODUCT</h3>
              <nav className="space-y-2">
                <a href="/#features" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="/#pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
                <a href="/#faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </nav>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">RESOURCES</h3>
              <nav className="space-y-2">
                <a href="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
                <a href="/docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
                {/* <a href="/roadmap" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Roadmap
                </a> */}
              </nav>
            </div>

            {/* Company Links */}
            {/* <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">COMPANY</h3>
              <nav className="space-y-2">
                <a href="/affiliates" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span className="text-yellow-500 mr-1">🔗</span>
                  Affiliates
                </a>
                <a href="/submit" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span className="text-orange-500 mr-1">🔥</span>
                  Submit
                </a>
                <a href="/discord" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span className="text-purple-500 mr-1">💬</span>
                  Join Discord
                </a>
              </nav>
            </div> */}

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">LEGAL</h3>
              <nav className="space-y-2">
                {/* <a href="/license" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  License Policy
                </a> */}
                <a href="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </nav>
            </div>
          </div>
          {/* Social Media & Built With */}
          <div className="lg:col-span-3">
            {/* Social Media Icons */}
            <div className="flex space-x-2 mb-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      <MessageCircle className="h-3 w-3" />
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
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      <Globe className="h-3 w-3" />
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
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      <Users className="h-3 w-3" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      <Mail className="h-3 w-3" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Contact us</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Built with badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted/50 border border-border/40">
              <span className="text-xs text-muted-foreground mr-2">Built with</span>
              <span className="text-xs font-semibold text-primary">⚡ ShipSaaS</span>
            </div>
          </div>
        </div>

        {/* Recognition & Badges Section */}
        <div className="pt-6">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            {/* Domain Badge */}
            {/* <div className="flex items-center bg-muted/30 rounded-lg px-3 py-2 border border-border/40">
              <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">31</span>
              </div>
              <div>
                <div className="text-xs font-semibold">shipsaas.net</div>
                <div className="text-xs text-muted-foreground">CERTIFIED DOMAIN RATING</div>
              </div>
            </div> */}

            {/* Peerlist Badge */}
            <a
              href="https://peerlist.io/wenhaofree/project/shipsaas"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center bg-green-500/10 rounded-lg px-3 py-2 border border-green-500/20">
                <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center mr-2">
                  <span className="text-white text-xs">🚀</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-green-400">Launched on</div>
                  <div className="text-xs font-bold">Peerlist</div>
                </div>
              </div>
            </a>

            {/* Product Hunt Badge */}
            {/* <div className="flex items-center bg-blue-500/10 rounded-lg px-3 py-2 border border-blue-500/20">
              <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xs">#2</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-400">OPEN LAUNCH</div>
                <div className="text-xs font-bold">#2 Project of the Day</div>
              </div>
            </div> */}
          </div>

          {/* Second Row of Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 mt-4">
            {/* Product of the Day */}
            {/* <div className="flex items-center bg-purple-500/10 rounded-lg px-3 py-2 border border-purple-500/20">
              <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xs">🏆</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-purple-400">FAZIER</div>
                <div className="text-xs font-bold">#3 Product of the Day</div>
              </div>
            </div> */}

            {/* Launching Soon */}
            {/* <div className="flex items-center bg-yellow-500/10 rounded-lg px-3 py-2 border border-yellow-500/20">
              <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xs">⚡</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-yellow-400">LAUNCHING SOON ON</div>
                <div className="text-xs font-bold">UNEED</div>
              </div>
            </div> */}

            {/* StartupFame */}
            {/* <div className="flex items-center bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20">
              <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xs">🔥</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-red-400">FEATURED ON</div>
                <div className="text-xs font-bold">StartupFame</div>
              </div>
            </div> */}

            {/* SaaS Boilerplates */}
            {/* <div className="flex items-center bg-gray-500/10 rounded-lg px-3 py-2 border border-gray-500/20">
              <div className="w-6 h-6 bg-gray-500 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xs">✓</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400">Verified AUTHENTIC</div>
                <div className="text-xs font-bold">Best SaaS Boilerplates</div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 • ShipSaaS All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footersection }