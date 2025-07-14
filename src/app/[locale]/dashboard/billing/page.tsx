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
  AlertCircle,
  CheckCircle,
  Loader2,
  Package,
  ExternalLink,
  Play
} from "lucide-react"
import { format } from "date-fns"
import { GitHubInviteModal } from "@/components/ui/github-invite-modal"

interface Order {
  id: number
  orderNo: string
  amount: number
  status: string
  createdAt: string
  productName: string
  currency: string
  paidAt: string | null
  orderDetail?: string
}

function BillingContent() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [activatingOrders, setActivatingOrders] = useState<Set<string>>(new Set())
  const [githubModalOpen, setGithubModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

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

  // Handle order activation
  const handleActivateOrder = async (orderNo: string) => {
    try {
      setActivatingOrders(prev => new Set(prev).add(orderNo))

      const response = await fetch("/api/orders/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderNo }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to activate order")
      }

      await response.json()

      // Update the order status in the local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNo === orderNo
            ? { ...order, status: 'activated' }
            : order
        )
      )

      // Find the activated order and open GitHub invitation modal
      const activatedOrder = orders.find(order => order.orderNo === orderNo)
      if (activatedOrder) {
        setSelectedOrder(activatedOrder)
        setGithubModalOpen(true)
      }

    } catch (error) {
      console.error("Error activating order:", error)
      alert("Failed to activate order. Please try again.")
    } finally {
      setActivatingOrders(prev => {
        const newSet = new Set(prev)
        newSet.delete(orderNo)
        return newSet
      })
    }
  }

  const handleCloseGithubModal = () => {
    setGithubModalOpen(false)
    setSelectedOrder(null)
  }

  // Handle successful GitHub invitation
  const handleGithubInviteSuccess = (orderNo: string, githubInfo: { githubUsername: string; repositoryName: string; invitationSentAt: string }) => {
    // Update the order in local state with GitHub info
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderNo === orderNo
          ? {
              ...order,
              orderDetail: JSON.stringify({
                ...JSON.parse(order.orderDetail || '{}'),
                ...githubInfo
              })
            }
          : order
      )
    )
  }

  // Handle manual GitHub invitation for activated orders
  const handleSendGithubInvitation = (order: Order) => {
    // Check if invitation has already been sent
    const githubInfo = getGitHubInfo(order)
    if (githubInfo?.invitationSentAt) {
      // Already sent invitation, don't allow resending
      return
    }

    setSelectedOrder(order)
    setGithubModalOpen(true)
  }

  const canActivateOrder = (order: Order) => {
    return order.status.toLowerCase() === 'paid' && order.paidAt
  }

  const isOrderActivating = (orderNo: string) => {
    return activatingOrders.has(orderNo)
  }

  const getGitHubInfo = (order: Order) => {
    if (!order.orderDetail) return null
    try {
      const detail = JSON.parse(order.orderDetail)
      return {
        githubUsername: detail.githubUsername,
        repositoryName: detail.repositoryName,
        invitationSentAt: detail.invitationSentAt
      }
    } catch {
      return null
    }
  }

  // Check if GitHub invitation has already been sent for this order
  const hasGitHubInvitationBeenSent = (order: Order) => {
    const githubInfo = getGitHubInfo(order)
    return !!(githubInfo?.invitationSentAt)
  }

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
      case 'activated':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Activated</Badge>
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
                    {orders.find(order => order.status === 'paid' || order.status === 'activated')?.productName || 'No Active Plan'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {orders.find(order => order.status === 'paid' || order.status === 'activated')
                      ? `Purchased • ${orders.filter(order => order.status === 'paid' || order.status === 'activated').length} order(s) completed`
                      : 'No active subscription'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    ${orders.find(order => order.status === 'paid' || order.status === 'activated')?.amount || '0.00'}
                  </div>
                  <Badge variant={orders.find(order => order.status === 'paid' || order.status === 'activated') ? "default" : "secondary"}>
                    {orders.find(order => order.status === 'paid' || order.status === 'activated') ? "Active" : "No Plan"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{orders.filter(order => order.status === 'paid' || order.status === 'activated').length}</div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">${orders.reduce((sum, order) => (order.status === 'paid' || order.status === 'activated') ? sum + order.amount : sum, 0).toFixed(2)}</div>
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
              {orders.find(order => order.status === 'paid' || order.status === 'activated') ? 'Upgrade Plan' : 'Choose Plan'}
            </Button>
            {orders.find(order => order.status === 'paid' || order.status === 'activated') && (
              <Button variant="outline">Manage Subscription</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      {/* <Card>
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
      </Card> */}

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
                <div key={order.id} className="border rounded-lg">
                  <div className="flex items-center justify-between p-4">
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
                      {(order.status === 'paid' || order.status === 'activated') && (
                        <Button variant="ghost" size="icon" title="Download Receipt">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Activation Section for Paid Orders */}
                  {canActivateOrder(order) && (
                    <div className="px-4 pb-4 pt-2 border-t bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Payment confirmed - Ready to activate</span>
                        </div>
                        <Button
                          onClick={() => handleActivateOrder(order.orderNo)}
                          disabled={isOrderActivating(order.orderNo)}
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {isOrderActivating(order.orderNo) ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Activating...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Activate Order
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* GitHub Access Info for Activated Orders */}
                  {order.status === 'activated' && (
                    <div className="px-4 pb-4 pt-2 border-t bg-green-50 dark:bg-green-900/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">Order Activated</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {!hasGitHubInvitationBeenSent(order) ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendGithubInvitation(order)}
                              className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                            >
                              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              Send GitHub Invitation
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Invitation Sent
                            </Button>
                          )}
                          {getGitHubInfo(order)?.repositoryName && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://github.com/ShipSaaSCo/${getGitHubInfo(order)?.repositoryName}`, '_blank')}
                              className="text-xs"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Repository
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        {hasGitHubInvitationBeenSent(order) ? (
                          <>
                            {getGitHubInfo(order)?.githubUsername && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                GitHub User: <span className="font-mono">{getGitHubInfo(order)?.githubUsername}</span>
                              </p>
                            )}
                            {getGitHubInfo(order)?.repositoryName && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Repository: <span className="font-mono">ShipSaaSCo/{getGitHubInfo(order)?.repositoryName}</span>
                              </p>
                            )}
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                              ✅ GitHub invitation sent: {format(new Date(getGitHubInfo(order)?.invitationSentAt!), 'MMM dd, yyyy HH:mm')}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Check your GitHub notifications to accept the repository invitation.
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            Click "Send GitHub Invitation" to get access to the repository.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Alerts */}
      {/* <Card>
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
      </Card> */}

      {/* GitHub Invite Modal */}
      {selectedOrder && (
        <GitHubInviteModal
          isOpen={githubModalOpen}
          onClose={handleCloseGithubModal}
          orderNo={selectedOrder.orderNo}
          productName={selectedOrder.productName}
          onSuccess={handleGithubInviteSuccess}
        />
      )}
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
