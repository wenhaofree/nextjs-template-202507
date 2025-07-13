"use client"

import { useState, useEffect } from "react"
import { User, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface ProfileFormProps {
  user?: {
    id?: string
    uuid?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

interface UserProfile {
  id: string
  uuid: string
  email: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
}

export const ProfileForm = ({ user: initialUser }: ProfileFormProps) => {
  const { data: session, update: updateSession } = useSession()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // 获取用户资料
  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data = await response.json()
      if (data.success) {
        setUser(data.user)
        setName(data.user.name || "")
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchUserProfile()
    } else {
      setIsFetching(false)
    }
  }, [session])

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Only JPEG, PNG, and WebP are allowed')
      return
    }

    // 验证文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error('File too large. Maximum size is 5MB')
      return
    }

    setAvatarFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // 自动上传头像
    await handleAvatarUpload(file)
  }

  const handleAvatarUpload = async (file: File) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload avatar')
      }

      if (data.success) {
        setUser(data.user)
        setAvatarPreview(null)
        setAvatarFile(null)
        toast.success('Avatar updated successfully')

        // 更新session
        if (updateSession) {
          await updateSession({
            ...session,
            user: {
              ...session?.user,
              image: data.user.image,
            }
          })
        }
      }
    } catch (error) {
      console.error('Avatar upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload avatar')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Please enter your display name")
      return
    }

    if (name.length < 3 || name.length > 30) {
      toast.error("Please use 3-30 characters for your name")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      if (data.success) {
        setUser(data.user)
        toast.success("Profile updated successfully")

        // 更新session
        if (updateSession) {
          await updateSession({
            ...session,
            user: {
              ...session?.user,
              name: data.user.name,
            }
          })
        }
      }
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (isFetching) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading profile...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
          <p className="text-muted-foreground">Unable to load your profile information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            Click upload button to upload a custom avatar (JPEG, PNG, WebP, max 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || user.image || ""} />
              <AvatarFallback className="text-lg">
                {user.name ? getInitials(user.name) : <User className="h-8 w-8" />}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <Button variant="outline" disabled={isUploading} asChild>
                  <span>
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Avatar
                      </>
                    )}
                  </span>
                </Button>
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={isUploading}
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Avatar will be uploaded automatically when you select a file
          </p>
        </CardContent>
      </Card>

      {/* Name Section */}
      <Card>
        <CardHeader>
          <CardTitle>Display Name</CardTitle>
          <CardDescription>
            Your display name shown to other users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your display name"
              maxLength={30}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Please use 3-30 characters for your name
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={isLoading || !name.trim() || name.length < 3 || name === user.name}
            className="w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Your account details and settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                value={user.email || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                Email address cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label>User UUID</Label>
              <Input
                value={user.uuid}
                disabled
                className="bg-muted font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Your unique user identifier (UUID)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Account Created</Label>
              <Input
                value={new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                When your account was created
              </p>
            </div>

            <div className="space-y-2">
              <Label>Last Updated</Label>
              <Input
                value={new Date(user.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                When your profile was last updated
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
