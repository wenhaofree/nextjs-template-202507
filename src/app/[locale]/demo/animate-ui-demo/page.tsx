'use client'

import { useState } from 'react'
import { 
  GradientText, 
  CountingNumber, 
  RippleButton, 
  StarsBackground 
} from '@/components/animate-ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AnimateUIDemo() {
  const [count, setCount] = useState(0)
  const [targetNumber, setTargetNumber] = useState(1000)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Stars Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <StarsBackground className="absolute inset-0" starColor="#ffffff">
          <div className="relative z-10 text-center space-y-8 px-4">
            <Badge variant="outline" className="mb-4">
              Animate UI Components
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold">
              <GradientText 
                text="Beautiful Animations" 
                className="text-4xl md:text-6xl font-bold"
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the power of Animate UI components with smooth animations and modern design.
            </p>
            <div className="flex gap-4 justify-center">
              <RippleButton 
                variant="default" 
                size="lg"
                onClick={() => setCount(count + 1)}
              >
                Click me! ({count})
              </RippleButton>
              <RippleButton 
                variant="outline" 
                size="lg"
                onClick={() => setTargetNumber(Math.floor(Math.random() * 10000))}
              >
                Random Number
              </RippleButton>
            </div>
          </div>
        </StarsBackground>
      </section>

      {/* Components Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Component Showcase</h2>
            <p className="text-muted-foreground">
              Explore the different Animate UI components available in this project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gradient Text Card */}
            <Card>
              <CardHeader>
                <CardTitle>Gradient Text</CardTitle>
                <CardDescription>
                  Animated gradient text with customizable colors and effects.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <GradientText 
                    text="Gradient Animation" 
                    className="text-2xl font-bold"
                  />
                </div>
                <div className="text-center">
                  <GradientText 
                    text="Neon Effect" 
                    className="text-xl font-bold"
                    neon={true}
                    gradient="linear-gradient(90deg, #ff0080 0%, #ff8c00 50%, #40e0d0 100%)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Counting Number Card */}
            <Card>
              <CardHeader>
                <CardTitle>Counting Number</CardTitle>
                <CardDescription>
                  Smooth number animations with spring physics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    <CountingNumber 
                      number={targetNumber} 
                      className="text-primary"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click "Random Number" to see animation
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    $<CountingNumber 
                      number={targetNumber * 0.99} 
                      decimalPlaces={2}
                      className="text-green-600"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    With decimal places
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Ripple Button Card */}
            <Card>
              <CardHeader>
                <CardTitle>Ripple Button</CardTitle>
                <CardDescription>
                  Interactive buttons with ripple effects and hover animations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <RippleButton variant="default" className="w-full">
                    Default Button
                  </RippleButton>
                  <RippleButton variant="outline" className="w-full">
                    Outline Button
                  </RippleButton>
                  <RippleButton variant="secondary" className="w-full">
                    Secondary Button
                  </RippleButton>
                  <RippleButton variant="destructive" className="w-full">
                    Destructive Button
                  </RippleButton>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Examples */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-center">Usage Examples</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`// Install using shadcn CLI
npx shadcn@latest add https://animate-ui.com/r/gradient-text.json
npx shadcn@latest add https://animate-ui.com/r/ripple-button.json
npx shadcn@latest add https://animate-ui.com/r/counting-number.json`}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Import & Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{`import { 
  GradientText, 
  RippleButton, 
  CountingNumber 
} from '@/components/animate-ui'

<GradientText text="Hello World!" />
<RippleButton>Click me</RippleButton>
<CountingNumber number={1000} />`}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
