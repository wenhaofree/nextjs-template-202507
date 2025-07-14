"use client"

import { useState } from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

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

      <motion.div
        className="grid w-full max-w-6xl gap-8 md:grid-cols-3 justify-items-center px-4 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.1 + 0.7,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
          >
            <PricingCard
              tier={tier}
              paymentFrequency={selectedFrequency}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
