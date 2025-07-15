"use client";

import { DesignSystemShowcase } from "@/components/ui/design-system-showcase";
import { SiteHeader } from "@/components/sections/site-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DesignSystemPage() {
  return (
    <>
      <SiteHeader />
      
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="section-padding-sm border-b">
          <div className="container-wide">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gradient">Design System</h1>
                <p className="text-lg text-muted-foreground">
                  Comprehensive design system with improved consistency and modern aesthetics
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Design System Showcase */}
        <DesignSystemShowcase />
        
        {/* Improvements Summary */}
        <section className="section-padding border-t bg-muted/30">
          <div className="container-narrow">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gradient">What's Improved</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">🎨 Design Consistency</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Unified spacing scale (4px to 128px)</li>
                    <li>• Consistent typography hierarchy</li>
                    <li>• Standardized animation timing</li>
                    <li>• Enhanced color palette</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">⚡ Performance & UX</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Optimized animation durations</li>
                    <li>• Improved button interactions</li>
                    <li>• Glass morphism effects</li>
                    <li>• Better visual hierarchy</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">🛠️ Developer Experience</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CSS custom properties</li>
                    <li>• Utility classes for common patterns</li>
                    <li>• Removed duplicate code</li>
                    <li>• Better component variants</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">🎯 Brand Identity</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Enhanced brand colors</li>
                    <li>• Gradient text effects</li>
                    <li>• Consistent shadows</li>
                    <li>• Modern glass effects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
