"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DesignSystemShowcaseProps {
  className?: string;
}

export function DesignSystemShowcase({ className }: DesignSystemShowcaseProps) {
  return (
    <div className={cn("container-wide section-padding", className)}>
      <div className="space-y-12">
        {/* Typography Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gradient">Typography Scale</h2>
          <div className="grid gap-4">
            <h1 className="text-8xl font-bold">Heading 1</h1>
            <h2 className="text-6xl font-bold">Heading 2</h2>
            <h3 className="text-4xl font-bold">Heading 3</h3>
            <h4 className="text-2xl font-bold">Heading 4</h4>
            <h5 className="text-xl font-bold">Heading 5</h5>
            <h6 className="text-lg font-bold">Heading 6</h6>
            <p className="text-base">Body text - Regular paragraph text</p>
            <p className="text-sm text-muted-foreground">Small text - Secondary information</p>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gradient">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 bg-primary rounded-lg"></div>
              <p className="text-sm font-medium">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-secondary rounded-lg"></div>
              <p className="text-sm font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-brand rounded-lg"></div>
              <p className="text-sm font-medium">Brand</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 bg-accent rounded-lg"></div>
              <p className="text-sm font-medium">Accent</p>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gradient">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="brand">Brand</Button>
            <Button variant="glow">Glow</Button>
            <Button variant="glass">Glass</Button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </section>

        {/* Animation Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gradient">Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="animate-appear-fast opacity-0">
              <CardHeader>
                <CardTitle>Fast Animation</CardTitle>
                <CardDescription>150ms duration</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="animate-appear-normal opacity-0" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Normal Animation</CardTitle>
                <CardDescription>300ms duration</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="animate-appear-slow opacity-0" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle>Slow Animation</CardTitle>
                <CardDescription>500ms duration</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Spacing Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gradient">Spacing Scale</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span className="text-sm">XS - 4px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-4 bg-primary rounded"></div>
              <span className="text-sm">SM - 8px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-4 bg-primary rounded"></div>
              <span className="text-sm">MD - 16px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-4 bg-primary rounded"></div>
              <span className="text-sm">LG - 24px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-4 bg-primary rounded"></div>
              <span className="text-sm">XL - 32px</span>
            </div>
          </div>
        </section>

        {/* Glass Effect Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gradient">Glass Effects</h2>
          <div className="relative p-8 bg-gradient-to-br from-brand/20 to-primary/20 rounded-lg">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>
                  This card demonstrates the glass morphism effect with backdrop blur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="glass">Glass Button</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
