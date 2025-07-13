"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { Loader2 } from "lucide-react"

export default function DashboardProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/signin?callbackUrl=/dashboard/profile')
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <ProfileForm user={session.user} />
  )
}
