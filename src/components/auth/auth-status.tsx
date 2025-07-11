"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "./user-avatar"
import Link from "next/link"

export function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
    )
  }

  if (session?.user) {
    return <UserAvatar />
  }

  return (
    <Button asChild variant="default" size="sm">
      <Link href="/auth/signin">Sign In</Link>
    </Button>
  )
}
