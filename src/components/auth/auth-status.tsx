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
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm" className="h-9 px-3 text-sm font-medium rounded-lg hover:bg-muted transition-all duration-200">
        <Link href="/auth/signin">Log in</Link>
      </Button>
      <Button asChild variant="default" size="sm" className="h-9 px-4 text-sm font-medium rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
        <Link href="/auth/signin">Get ShipSaaS</Link>
      </Button>
    </div>
  )
}
