import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/dashboard/profile-form"

export default async function DashboardProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard/profile')
  }

  return (
    <ProfileForm user={session.user} />
  )
}
