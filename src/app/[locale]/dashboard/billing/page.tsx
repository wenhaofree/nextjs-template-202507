"use client"

import { useEffect, useState, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Loader2,
  Package
} from "lucide-react"
import { format } from "date-fns"

interface Order {
  id: number
  orderNo: string
  amount: number
  status: string
  createdAt: string
  productName: string
  currency: string
  paidAt: string | null
}

function BillingContent() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  // Check for payment success parameters
  const sessionId = searchParams.get('session_id')
  const amount = searchParams.get('amount')

  useEffect(() => {
    if (sessionId && amount) {
      setShowSuccessAlert(true)
      // Auto-hide success alert after 10 seconds
      const timer = setTimeout(() => {
        setShowSuccessAlert(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [sessionId, amount])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) return

      try {
        const response = await fetch("/api/orders")
        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchOrders()
    }
  }, [session])

  if (status === "loading" || loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading billing information...</span>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view billing</h1>
          <Button onClick={() => window.location.href = '/auth/signin?callbackUrl=/dashboard/billing'}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Failed</Badge>
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Expired</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Success Alert */}
      {showSuccessAlert && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Payment successful! Your order for ${amount} has been processed. You can view the details in your billing history below.
          </AlertDescription>
        </Alert>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage billing and subscriptions
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            Your current subscription and usage details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {orders.find(order => order.status === 'paid')?.productName || 'No Active Plan'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {orders.find(order => order.status === 'paid')
                      ? `Purchased • ${orders.filter(order => order.status === 'paid').length} order(s) completed`
                      : 'No active subscription'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    ${orders.find(order => order.status === 'paid')?.amount || '0.00'}
                  </div>
                  <Badge variant={orders.find(order => order.status === 'paid') ? "default" : "secondary"}>
                    {orders.find(order => order.status === 'paid') ? "Active" : "No Plan"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{orders.filter(order => order.status === 'paid').length}</div>
                  <p className="text-sm text-muted-foreground">Paid Orders</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">${orders.reduce((sum, order) => order.status === 'paid' ? sum + order.amount : sum, 0).toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{orders.length}</div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No subscription plan active</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/#pricing'}>
              {orders.find(order => order.status === 'paid') ? 'Upgrade Plan' : 'Choose Plan'}
            </Button>
            {orders.find(order => order.status === 'paid') && (
              <Button variant="outline">Manage Subscription</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment methods and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2027</p>
              </div>
            </div>
            <Badge variant="secondary">Default</Badge>
          </div>
          
          <Button variant="outline">Add Payment Method</Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Your purchase history and order details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't made any purchases yet. Browse our pricing plans to get started.
              </p>
              <Button onClick={() => window.location.href = '/#pricing'}>
                View Pricing
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{order.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Order #{order.orderNo} • {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                      </p>
                      {order.paidAt && (
                        <p className="text-xs text-green-600">
                          Paid on {format(new Date(order.paidAt), 'MMM dd, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${order.amount} {order.currency.toUpperCase()}</p>
                      {getStatusBadge(order.status)}
                    </div>
                    {order.status === 'paid' && (
                      <Button variant="ghost" size="icon" title="Download Receipt">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Usage Alerts
          </CardTitle>
          <CardDescription>
            Important notifications about your usage and billing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">API Usage Warning</p>
                <p className="text-sm text-muted-foreground">
                  You've used 85% of your monthly API quota. Consider upgrading to avoid service interruption.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BillingPageFallback() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading billing information...</span>
      </div>
    </div>
  )
}

export default function DashboardBillingPage() {
  return (
    <Suspense fallback={<BillingPageFallback />}>
      <BillingContent />
    </Suspense>
  )
}
