"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

interface ProfileFormProps {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [name, setName] = useState(user?.name || "")
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
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
      // Here you would typically make an API call to update the profile
      // For now, we'll simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
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
            Click upload button to upload a custom one
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || user?.image || ""} />
              <AvatarFallback className="text-lg">
                {user?.name ? getInitials(user.name) : <User className="h-8 w-8" />}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>Upload Avatar</span>
                </Button>
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            An avatar is optional but strongly recommended
          </p>
        </CardContent>
      </Card>

      {/* Name Section */}
      <Card>
        <CardHeader>
          <CardTitle>Name</CardTitle>
          <CardDescription>
            Please enter your display name
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={30}
            />
            <p className="text-sm text-muted-foreground">
              Please use 3-30 characters for your name
            </p>
          </div>
          
          <Button 
            onClick={handleSave}
            disabled={isLoading || !name.trim() || name.length < 3}
            className="w-auto"
          >
            {isLoading ? "Saving..." : "Save"}
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
                value={user?.email || ""} 
                disabled 
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                Email address cannot be changed
              </p>
            </div>
            
            {user?.id && (
              <div className="space-y-2">
                <Label>User ID</Label>
                <Input
                  value={user.id}
                  disabled
                  className="bg-muted font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  Your unique user identifier
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
