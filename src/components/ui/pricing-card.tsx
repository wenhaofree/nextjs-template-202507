"use client"

import * as React from "react"
import { BadgeCheck } from "lucide-react"
import NumberFlow from "@number-flow/react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface PricingTier {
  name: string
  price: Record<string, number | string>
  originalPrice?: Record<string, number | string>
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  popular?: boolean
  id?: string
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency]
  const originalPrice = tier.originalPrice?.[paymentFrequency]
  const isHighlighted = tier.highlighted
  const isPopular = tier.popular
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || ""

  const handlePayment = async () => {
    // 处理"联系我们"按钮
    if (tier.cta === "Contact Us") {
      router.push("/contact")
      return
    }
    
    // 如果价格是 "Free" 或 "Custom"，不需要支付
    if (typeof price !== "number") {
      if (price === "Custom") {
        router.push("/contact")
        return
      }
      if (price === "Free") {
        toast.success(locale === "zh" ? "已选择免费方案" : "Free plan selected")
        return
      }
      return
    }
    
    // 检查登录状态
    if (!session) {
      toast.error(locale === "zh" ? "请先登录再进行购买" : "Please login before making a purchase")
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
      return
    }

    try {
      // 调用 Stripe API 创建支付会话
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price,
          email: session.user?.email,
          productName: `${tier.name} - ShipSaas`,
          successUrl: `${window.location.origin}/${locale}/orders?session_id={CHECKOUT_SESSION_ID}&amount=${price}`,
          cancelUrl: `${window.location.origin}/${locale}/#pricing`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || (locale === "zh" ? "支付请求失败" : "Payment request failed"))
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      } else {
        throw new Error(locale === "zh" ? "未收到结账 URL" : "No checkout URL received")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (locale === "zh" ? "支付失败，请重试" : "Payment failed. Please try again."))
    }
  }

  return (
    <Card
      className={cn(
        "relative flex flex-col p-6 transition-all duration-300",
        isHighlighted
          ? "border-primary shadow-lg scale-105"
          : "border-border hover:border-primary/50",
        "h-full"
      )}
    >
      {isPopular && (
        <Badge
          variant="default"
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground"
        >
          Most Popular
        </Badge>
      )}

      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{tier.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            {typeof price === "number" ? (
              <>
                <span className="text-3xl font-bold">
                  $<NumberFlow value={price} />
                </span>
                <span className="text-muted-foreground">
                  /{paymentFrequency === "yearly" ? "year" : "month"}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">{price}</span>
            )}
          </div>
          
          {originalPrice && typeof originalPrice === "number" && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
              <Badge variant="secondary" className="text-xs">
                Save ${originalPrice - (price as number)}
              </Badge>
            </div>
          )}
        </div>

        <ul className="space-y-3 mb-6">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <BadgeCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={handlePayment}
        className={cn(
          "w-full",
          isHighlighted
            ? "bg-primary hover:bg-primary/90"
            : "bg-secondary hover:bg-secondary/80"
        )}
        size="lg"
      >
        {tier.cta}
      </Button>
    </Card>
  )
}
