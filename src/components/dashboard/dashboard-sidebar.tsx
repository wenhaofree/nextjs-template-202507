"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from 'next-intl'
import { 
  User, 
  CreditCard, 
  Shield, 
  Bell, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}



const communityItems: SidebarItem[] = [
  {
    title: "Discord Community",
    href: "/discord",
    icon: MessageSquare,
    description: "Join our Discord community"
  }
]

export const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('Dashboard')

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: t('navigation.dashboard'),
      href: "/dashboard",
      icon: Home,
      description: t('subtitle')
    },
    {
      title: t('navigation.profile'),
      href: "/dashboard/profile",
      icon: User,
      description: t('profile.subtitle')
    },
    {
      title: t('navigation.billing'),
      href: "/dashboard/billing",
      icon: CreditCard,
      description: t('billing.subtitle')
    },
    {
      title: t('navigation.security'),
      href: "/dashboard/security",
      icon: Shield,
      description: t('security.subtitle')
    },
    {
      title: t('navigation.notifications'),
      href: "/dashboard/notifications",
      icon: Bell,
      description: t('notifications.subtitle')
    },
    {
      title: t('navigation.settings'),
      href: "/dashboard/settings",
      icon: Settings,
      description: t('settings.subtitle')
    }
  ]

  return (
    <div className={cn(
      "flex flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo and Toggle */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="font-semibold">ShipSaaS</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleCollapse}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {/* Settings Section */}
          {!isCollapsed && (
            <div className="px-3 py-2">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t('navigation.settings')}
              </h2>
            </div>
          )}
          
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            )
          })}

          {/* Community Section */}
          {!isCollapsed && (
            <>
              <Separator className="my-4" />
              <div className="px-3 py-2">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Community
                </h2>
              </div>
            </>
          )}
          
          {communityItems.map((item) => {
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t p-4">
          <div className="text-xs text-muted-foreground text-center">
            <p>Join our Discord community to</p>
            <p>get help, share your ideas, and</p>
            <p>connect with other users.</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Join Discord
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
