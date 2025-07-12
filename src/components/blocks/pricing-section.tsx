"use client"

import { useState } from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingSectionProps {
  title: string
  subtitle: string
  tiers: PricingTier[]
  frequencies: string[]
  frequencyLabels?: Record<string, string>
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
  frequencyLabels = { monthly: "Monthly", yearly: "Yearly" }
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0] || "monthly")

  return (
    <section className="flex flex-col items-center gap-16 py-20">
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        {/* Frequency Toggle */}
        {frequencies.length > 1 && (
          <div className="flex items-center justify-center mt-8">
            <div className="bg-muted p-1 rounded-lg">
              {frequencies.map((frequency) => (
                <Button
                  key={frequency}
                  variant={selectedFrequency === frequency ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedFrequency(frequency)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all",
                    selectedFrequency === frequency
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {frequencyLabels[frequency] || frequency}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid w-full max-w-6xl gap-8 md:grid-cols-3 justify-items-center px-4 pt-8">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            paymentFrequency={selectedFrequency}
          />
        ))}
      </div>
    </section>
  )
}
