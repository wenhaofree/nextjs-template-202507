"use client"

import { useState, useEffect } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SignInFormProps {
  title?: string
  description?: string
}

export function SignInForm({
  title = "Welcome back",
  description = "Choose your preferred sign in method"
}: SignInFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (errorParam) {
      setError(getErrorMessage(errorParam))
    }
  }, [errorParam])

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return 'Error occurred during sign in. Please try again.'
      case 'OAuthAccountNotLinked':
        return 'Email already exists with different provider. Please sign in with the original provider.'
      case 'EmailSignin':
        return 'Unable to send email. Please try again.'
      case 'CredentialsSignin':
        return 'Invalid email or password.'
      case 'SessionRequired':
        return 'Please sign in to access this page.'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setLoading(provider)
      setError('')

      const result = await signIn(provider, {
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setError('An error occurred during sign in')
    } finally {
      setLoading('')
    }
  }

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setLoading('credentials')

      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setError('An error occurred during sign in')
    } finally {
      setLoading('')
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    try {
      setError('')
      setLoading('credentials')

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed')
        return
      }

      // 注册成功，自动登录
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError('Registration successful, but login failed. Please try signing in.')
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error('Sign up error:', err)
      setError('An error occurred during registration')
    } finally {
      setLoading('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* OAuth Providers */}
          <div className="space-y-3">
            {process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignIn('google')}
                disabled={!!loading}
                className="w-full"
              >
                <Icons.google className="mr-2 h-4 w-4" />
                {loading === 'google' ? 'Signing in...' : 'Continue with Google'}
              </Button>
            )}

            {process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignIn('github')}
                disabled={!!loading}
                className="w-full"
              >
                <Icons.gitHub className="mr-2 h-4 w-4" />
                {loading === 'github' ? 'Signing in...' : 'Continue with GitHub'}
              </Button>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleCredentialsSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading === 'credentials'}
            >
              {loading === 'credentials' ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>
          </form>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
