"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/ui/icons"

interface UserAvatarProps {
  showName?: boolean
  size?: "sm" | "md" | "lg"
}

export function UserAvatar({ showName = false, size = "md" }: UserAvatarProps) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    const sizeClasses = {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10"
    }
    return (
      <div className={`${sizeClasses[size]} animate-pulse rounded-full bg-muted`} />
    )
  }

  if (!session?.user) {
    return null
  }

  const { user } = session
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={showName ? `Open menu for ${user.name}` : 'Open user menu'}
          className={`relative ${sizeClasses[size]} rounded-full ${showName ? 'flex items-center gap-2 px-2' : ''}`}
        >
          <Avatar className={sizeClasses[size]}>
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback aria-hidden>{initials}</AvatarFallback>
          </Avatar>
          {showName ? (
            <span className="text-sm font-medium">{user.name}</span>
          ) : (
            <span className="sr-only">Open user menu</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/dashboard/profile">
            <Icons.user className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </a>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <Icons.settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem asChild>
          <a href="/dashboard/billing"> 
          <Icons.settings className="mr-2 h-4 w-4" />
          <span>Billing</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({ callbackUrl: "/" })
          }}
        >
          <Icons.logOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
