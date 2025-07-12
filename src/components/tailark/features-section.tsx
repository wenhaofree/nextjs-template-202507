"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Shield,
  Rocket,
  Users,
  Star,
  Heart,
  CheckCircle,
  Settings,
  Globe,
  Lock,
  Smartphone,
  Database
} from "lucide-react"

const iconMap = {
  zap: Zap,
  shield: Shield,
  rocket: Rocket,
  users: Users,
  star: Star,
  heart: Heart,
  checkCircle: CheckCircle,
  settings: Settings,
  globe: Globe,
  lock: Lock,
  smartphone: Smartphone,
  database: Database
}

type IconName = keyof typeof iconMap

interface Feature {
  icon: IconName
  title: string
  description: string
  badge?: string
}

interface FeaturesSectionProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  features: Feature[]
  layout?: "grid" | "list"
  columns?: 2 | 3 | 4
}

const FeaturesSection = ({
  badge,
  title,
  subtitle,
  description,
  features,
  layout = "grid",
  columns = 3
}: FeaturesSectionProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4"
  }

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
        </div>

        {/* Features */}
        <div className="mt-16">
          {layout === "grid" ? (
            <div className={`grid gap-8 ${gridCols[columns]}`}>
              {features.map((feature, index) => (
                <Card key={index} className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {(() => {
                          const IconComponent = iconMap[feature.icon]
                          return <IconComponent className="h-6 w-6" />
                        })()}
                      </div>
                      {feature.badge && (
                        <Badge variant="outline" className="text-xs">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {(() => {
                      const IconComponent = iconMap[feature.icon]
                      return <IconComponent className="h-6 w-6" />
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      {feature.badge && (
                        <Badge variant="outline" className="text-xs">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
export type { FeaturesSectionProps, Feature }
