"use client"

import React, { forwardRef, useEffect, useId, useRef } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLElement | null>
  fromRef: React.RefObject<HTMLElement | null>
  toRef: React.RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = Math.random() * 3 + 4,
      delay = 0,
      pathColor = "gray",
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = "#ffaa40",
      gradientStopColor = "#9c40ff",
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref,
  ) => {
    const id = useId()
    const svgRef = useRef<SVGSVGElement>(null)
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const updatePath = () => {
          if (containerRef.current && fromRef.current && toRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const rectA = fromRef.current.getBoundingClientRect()
            const rectB = toRef.current.getBoundingClientRect()

            const svgX = containerRect.left
            const svgY = containerRect.top
            const svgWidth = containerRect.width
            const svgHeight = containerRect.height

            const startX = rectA.left - svgX + rectA.width / 2 + startXOffset
            const startY = rectA.top - svgY + rectA.height / 2 + startYOffset
            const endX = rectB.left - svgX + rectB.width / 2 + endXOffset
            const endY = rectB.top - svgY + rectB.height / 2 + endYOffset

            const controlPointX = startX + (endX - startX) / 2
            const controlPointY = startY - curvature

            const d = `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`
            pathRef.current?.setAttribute("d", d)
          }
        }

        // Set up ResizeObserver
        const resizeObserver = new ResizeObserver((entries) => {
          // On the next frame (to ensure DOM is updated)
          requestAnimationFrame(updatePath)
        })

        // Observe the container element
        if (containerRef.current) {
          resizeObserver.observe(containerRef.current)
        }

        // Initial update
        updatePath()

        // Clean up observer on component unmount
        return () => resizeObserver.disconnect()
      }
    }, [
      containerRef,
      fromRef,
      toRef,
      curvature,
      startXOffset,
      startYOffset,
      endXOffset,
      endYOffset,
    ])

    return (
      <svg
        ref={ref || svgRef}
        className={cn(
          "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
          className,
        )}
        width="100%"
        height="100%"
        viewBox="0 0 100% 100%"
        style={{
          transform: "translateZ(0)",
        }}
      >
        <defs>
          <linearGradient
            className={cn("transform-gpu")}
            id={id}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop stopColor={gradientStartColor} />
            <stop offset="32.5%" stopColor={gradientStopColor} />
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          fill="none"
        />
        <path
          stroke={`url(#${id})`}
          strokeWidth={pathWidth}
          strokeOpacity="1"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: "80px 160px",
            strokeDashoffset: reverse ? "-240px" : "240px",
            animation: `linear ${duration}s infinite ${delay}s ${
              reverse ? "reverse" : "normal"
            } running`,
            animationName: reverse ? "beam-reverse" : "beam",
          }}
        />
        <style jsx>{`
          @keyframes beam {
            to {
              stroke-dashoffset: -240px;
            }
          }
          @keyframes beam-reverse {
            to {
              stroke-dashoffset: 240px;
            }
          }
        `}</style>
      </svg>
    )
  },
)

AnimatedBeam.displayName = "AnimatedBeam"
