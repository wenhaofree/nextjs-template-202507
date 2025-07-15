"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Marquee, 
  BorderBeam, 
  AnimatedBeam, 
  Meteors, 
  OrbitingCircles, 
  ShimmerButton, 
  NumberTicker 
} from "@/components/magicui"

// Sample data for marquee
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]">
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export default function MagicUIShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const div1Ref = useRef<HTMLDivElement | null>(null)
  const div2Ref = useRef<HTMLDivElement | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Magic UI Components</h1>
          <p className="text-xl text-muted-foreground">
            Beautiful, animated components built with React and Tailwind CSS
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid gap-8">
          
          {/* Marquee Section */}
          <Card>
            <CardHeader>
              <CardTitle>Marquee</CardTitle>
              <CardDescription>
                An infinite scrolling component that can be used to display text, images, or videos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
                <Marquee pauseOnHover className="[--duration:20s]">
                  {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                  {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                  ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
              </div>
            </CardContent>
          </Card>

          {/* Border Beam Section */}
          <Card>
            <CardHeader>
              <CardTitle>Border Beam</CardTitle>
              <CardDescription>
                A border with a moving beam of light effect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
                <div className="relative flex h-32 w-64 items-center justify-center rounded-lg border bg-background">
                  <span className="text-lg font-semibold">Border Beam Effect</span>
                  <BorderBeam size={250} duration={12} delay={9} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Animated Beam Section */}
          <Card>
            <CardHeader>
              <CardTitle>Animated Beam</CardTitle>
              <CardDescription>
                Animated beams connecting different elements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background"
                ref={containerRef}
              >
                <div className="flex size-full max-w-lg items-center justify-center px-40">
                  <div className="flex size-full flex-col items-stretch justify-between gap-10">
                    <div className="flex flex-row items-center justify-between">
                      <div
                        ref={div1Ref}
                        className="size-12 rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                      >
                        <div className="size-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                      </div>
                      <div
                        ref={div2Ref}
                        className="size-12 rounded-full border-2 border-border bg-background p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
                      >
                        <div className="size-full rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
                      </div>
                    </div>
                  </div>
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div1Ref}
                    toRef={div2Ref}
                    curvature={-75}
                    endYOffset={-10}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meteors Section */}
          <Card>
            <CardHeader>
              <CardTitle>Meteors</CardTitle>
              <CardDescription>
                Animated meteor shower effect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
                <Meteors number={30} />
                <span className="text-lg font-semibold relative z-10">Meteor Shower</span>
              </div>
            </CardContent>
          </Card>

          {/* Orbiting Circles Section */}
          <Card>
            <CardHeader>
              <CardTitle>Orbiting Circles</CardTitle>
              <CardDescription>
                Circles that orbit around a central point.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
                <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
                  Orbit
                </span>

                {/* Inner Circles */}
                <OrbitingCircles
                  className="size-[30px] border-none bg-transparent"
                  duration={20}
                  delay={20}
                  radius={80}
                >
                  <div className="size-full rounded-full bg-blue-500" />
                </OrbitingCircles>
                <OrbitingCircles
                  className="size-[30px] border-none bg-transparent"
                  duration={20}
                  delay={10}
                  radius={80}
                >
                  <div className="size-full rounded-full bg-green-500" />
                </OrbitingCircles>

                {/* Outer Circles (reverse) */}
                <OrbitingCircles
                  className="size-[50px] border-none bg-transparent"
                  radius={190}
                  duration={20}
                  reverse
                >
                  <div className="size-full rounded-full bg-purple-500" />
                </OrbitingCircles>
                <OrbitingCircles
                  className="size-[50px] border-none bg-transparent"
                  radius={190}
                  duration={20}
                  delay={20}
                  reverse
                >
                  <div className="size-full rounded-full bg-red-500" />
                </OrbitingCircles>
              </div>
            </CardContent>
          </Card>

          {/* Shimmer Button Section */}
          <Card>
            <CardHeader>
              <CardTitle>Shimmer Button</CardTitle>
              <CardDescription>
                A button with a shimmer effect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] w-full items-center justify-center space-x-4">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Shimmer Button
                  </span>
                </ShimmerButton>
                <Button variant="outline">Regular Button</Button>
              </div>
            </CardContent>
          </Card>

          {/* Number Ticker Section */}
          <Card>
            <CardHeader>
              <CardTitle>Number Ticker</CardTitle>
              <CardDescription>
                Animated number counter with smooth transitions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] w-full items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    <NumberTicker value={100} />
                  </div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    <NumberTicker value={1000} />
                  </div>
                  <p className="text-sm text-muted-foreground">Users</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    <NumberTicker value={99.9} decimalPlaces={1} />%
                  </div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
