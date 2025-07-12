"use client"

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

interface PricingFeature {
  name: string
  included: boolean
  description?: string
}

interface PricingPlan {
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  currency?: string
  badge?: string
  features: PricingFeature[]
  cta: {
    text: string
    href: string
    variant?: "default" | "outline" | "secondary"
  }
  popular?: boolean
}

interface PricingSectionProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  plans: PricingPlan[]
  showYearlyToggle?: boolean
  yearlyDiscount?: string
}

const PricingSection = ({
  badge,
  title,
  subtitle,
  description,
  plans,
  showYearlyToggle = true,
  yearlyDiscount
}: PricingSectionProps) => {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="mb-4 flex justify-center">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                {badge}
              </Badge>
            </div>
          )}
          
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
            {subtitle && (
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {subtitle}
              </span>
            )}
          </h2>
          
          {description && (
            <p className="text-lg text-muted-foreground sm:text-xl">
              {description}
            </p>
          )}

          {/* Billing Toggle */}
          {showYearlyToggle && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                aria-label="Toggle yearly billing"
              />
              <span className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {yearlyDiscount && isYearly && (
                <Badge variant="secondary" className="ml-2">
                  {yearlyDiscount}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'border-primary shadow-lg ring-1 ring-primary/20' 
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary" />
              )}
              
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    {plan.name}
                  </CardTitle>
                  {plan.badge && (
                    <Badge variant={plan.popular ? "default" : "secondary"}>
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                
                {/* Price */}
                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.currency || '$'}
                      {isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && plan.price.yearly < plan.price.monthly * 12 && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Save ${(plan.price.monthly * 12) - plan.price.yearly} per year
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                        feature.included 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {feature.included ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {feature.name}
                        </span>
                        {feature.description && (
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.cta.variant || (plan.popular ? "default" : "outline")}
                  asChild
                >
                  <a href={plan.cta.href}>
                    {plan.cta.text}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
export type { PricingSectionProps, PricingPlan, PricingFeature }
