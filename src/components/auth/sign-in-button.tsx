"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

interface SignInButtonProps {
  provider: "google" | "github"
  children?: React.ReactNode
  className?: string
  callbackUrl?: string
  disabled?: boolean
}

export function SignInButton({
  provider,
  children,
  className,
  callbackUrl = "/",
  disabled = false
}: SignInButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setLoading(true)
      await signIn(provider, {
        callbackUrl,
        redirect: false
      })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setLoading(false)
    }
  }

  const providerConfig = {
    google: {
      icon: <Icons.google className="h-4 w-4" />,
      label: "Continue with Google",
      enabled: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true",
    },
    github: {
      icon: <Icons.gitHub className="h-4 w-4" />,
      label: "Continue with GitHub",
      enabled: process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true",
    },
  }

  const config = providerConfig[provider]

  // 如果提供商未启用，不渲染按钮
  if (!config.enabled) {
    return null
  }

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      className={className}
      disabled={disabled || loading}
    >
      {config.icon}
      {loading ? "Signing in..." : (children || config.label)}
    </Button>
  )
}
