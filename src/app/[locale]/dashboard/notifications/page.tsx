import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  Mail, 
  Smartphone,
  MessageSquare,
  CreditCard,
  Shield,
  TrendingUp
} from "lucide-react"

export default async function DashboardNotificationsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard/notifications')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Notification preferences
        </p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Choose what email notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-marketing">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and promotions
              </p>
            </div>
            <Switch id="email-marketing" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-security">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Important security notifications and login alerts
              </p>
            </div>
            <Switch id="email-security" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-billing">Billing Updates</Label>
              <p className="text-sm text-muted-foreground">
                Invoices, payment confirmations, and billing issues
              </p>
            </div>
            <Switch id="email-billing" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-product">Product Updates</Label>
              <p className="text-sm text-muted-foreground">
                New features, improvements, and product announcements
              </p>
            </div>
            <Switch id="email-product" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Manage push notifications for mobile and desktop
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-enabled">Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Allow notifications to be sent to your devices
              </p>
            </div>
            <Switch id="push-enabled" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-mentions">Mentions & Replies</Label>
              <p className="text-sm text-muted-foreground">
                When someone mentions you or replies to your content
              </p>
            </div>
            <Switch id="push-mentions" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-activity">Account Activity</Label>
              <p className="text-sm text-muted-foreground">
                Important account activities and status changes
              </p>
            </div>
            <Switch id="push-activity" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Categories
          </CardTitle>
          <CardDescription>
            Customize notifications by category
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              icon: CreditCard,
              title: "Billing & Payments",
              description: "Payment confirmations, failed payments, and billing updates",
              enabled: true
            },
            {
              icon: Shield,
              title: "Security & Privacy",
              description: "Login alerts, security warnings, and privacy updates",
              enabled: true
            },
            {
              icon: TrendingUp,
              title: "Analytics & Reports",
              description: "Weekly reports, usage summaries, and performance insights",
              enabled: false
            },
            {
              icon: MessageSquare,
              title: "Community & Social",
              description: "Comments, mentions, and community activity",
              enabled: true
            }
          ].map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <category.icon className="h-5 w-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>{category.title}</Label>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
              <Switch defaultChecked={category.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
