import { Suspense } from "react"
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}
