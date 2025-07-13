/**
 * Order Activation Demo Page / 订单激活演示页面
 *
 * @description Demonstrates the complete order activation and GitHub invitation flow.
 * Shows how to activate orders and automatically trigger GitHub repository invitations.
 * @description 演示完整的订单激活和GitHub邀请流程。展示如何激活订单并自动触发GitHub仓库邀请。
 *
 * @author ShipSaaS.CO
 * @version 1.0.0
 * @since 2024-01-01
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GitHubInviteModal } from "@/components/ui/github-invite-modal";
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Package, 
  CreditCard,
  Github,
  Play,
  ExternalLink
} from "lucide-react";
import { useSession } from "next-auth/react";

/**
 * Mock order interface for demo
 * 演示用的模拟订单接口
 */
interface MockOrder {
  id: number;
  orderNo: string;
  productName: string;
  amount: number;
  currency: string;
  status: string;
  paidAt?: string;
  createdAt: string;
}

/**
 * Order Activation Demo Component
 * 订单激活演示组件
 */
export default function OrderActivationDemo() {
  const { data: session } = useSession();
  
  // Demo state
  const [mockOrders, setMockOrders] = useState<MockOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(null);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [activatingOrders, setActivatingOrders] = useState<Set<string>>(new Set());
  
  // Form state for creating mock orders
  const [newOrderForm, setNewOrderForm] = useState({
    productName: "Basic Plan",
    amount: 99,
    currency: "USD"
  });

  /**
   * Initialize demo with mock orders
   * 初始化演示数据
   */
  useEffect(() => {
    const demoOrders: MockOrder[] = [
      {
        id: 1,
        orderNo: "DEMO_001",
        productName: "Basic Plan",
        amount: 99,
        currency: "USD",
        status: "paid",
        paidAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        orderNo: "DEMO_002",
        productName: "Standard Plan",
        amount: 169,
        currency: "USD",
        status: "activated",
        paidAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      }
    ];
    setMockOrders(demoOrders);
  }, []);

  /**
   * Handle order activation
   * 处理订单激活
   */
  const handleActivateOrder = async (order: MockOrder) => {
    setActivatingOrders(prev => new Set(prev).add(order.orderNo));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update order status
      setMockOrders(prevOrders =>
        prevOrders.map(o =>
          o.orderNo === order.orderNo
            ? { ...o, status: 'activated' }
            : o
        )
      );

      // Open GitHub invitation modal
      const activatedOrder = { ...order, status: 'activated' };
      setSelectedOrder(activatedOrder);
      setGithubModalOpen(true);

    } catch (error) {
      console.error("Error activating order:", error);
      alert("Failed to activate order. Please try again.");
    } finally {
      setActivatingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(order.orderNo);
        return newSet;
      });
    }
  };

  /**
   * Handle manual GitHub invitation
   * 处理手动GitHub邀请
   */
  const handleSendGithubInvitation = (order: MockOrder) => {
    setSelectedOrder(order);
    setGithubModalOpen(true);
  };

  /**
   * Handle GitHub modal close
   * 处理GitHub弹窗关闭
   */
  const handleCloseGithubModal = () => {
    setGithubModalOpen(false);
    setSelectedOrder(null);
  };

  /**
   * Create new mock order
   * 创建新的模拟订单
   */
  const handleCreateMockOrder = () => {
    const newOrder: MockOrder = {
      id: mockOrders.length + 1,
      orderNo: `DEMO_${String(mockOrders.length + 1).padStart(3, '0')}`,
      productName: newOrderForm.productName,
      amount: newOrderForm.amount,
      currency: newOrderForm.currency,
      status: "paid",
      paidAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    setMockOrders(prev => [...prev, newOrder]);
  };

  /**
   * Get status badge for order
   * 获取订单状态徽章
   */
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <Badge variant="default" className="bg-blue-500">Paid</Badge>;
      case 'activated':
        return <Badge variant="default" className="bg-green-500">Activated</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  /**
   * Check if order is activating
   * 检查订单是否正在激活
   */
  const isOrderActivating = (orderNo: string) => {
    return activatingOrders.has(orderNo);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Order Activation Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This demo page shows the complete order activation flow with automatic GitHub repository invitation.
            Click "Activate Order" to see the GitHub invitation modal in action.
          </p>
          {!session && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                Please sign in to test the complete flow with real API calls.
              </p>
            </div>
          )}
        </div>

        {/* Create Mock Order */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Create Mock Order
            </CardTitle>
            <CardDescription>
              Create a new mock order to test the activation flow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <select
                  id="product-name"
                  value={newOrderForm.productName}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, productName: e.target.value }))}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="Basic Plan">Basic Plan</option>
                  <option value="Standard Plan">Standard Plan</option>
                  <option value="Premium Plan">Premium Plan</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newOrderForm.amount}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={newOrderForm.currency}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, currency: e.target.value }))}
                />
              </div>
            </div>

            <Button onClick={handleCreateMockOrder} className="w-full">
              <Package className="w-4 h-4 mr-2" />
              Create Mock Order
            </Button>
          </CardContent>
        </Card>

        <Separator />

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Demo Orders
            </CardTitle>
            <CardDescription>
              Mock orders for testing the activation and GitHub invitation flow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No orders found. Create a mock order to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{order.productName}</h4>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Order #{order.orderNo} • ${order.amount} {order.currency}
                        </p>
                        {order.paidAt && (
                          <p className="text-xs text-muted-foreground">
                            Paid: {new Date(order.paidAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {order.status === 'paid' && (
                          <Button
                            onClick={() => handleActivateOrder(order)}
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
                        )}

                        {order.status === 'activated' && (
                          <Button
                            onClick={() => handleSendGithubInvitation(order)}
                            size="sm"
                            variant="outline"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Send GitHub Invitation
                          </Button>
                        )}
                      </div>
                    </div>

                    {order.status === 'activated' && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">Order Activated</span>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                          This order has been activated. You can now send GitHub repository invitations.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>1. <strong>Create Mock Order:</strong> Use the form above to create a new mock order with "paid" status.</p>
            <p>2. <strong>Activate Order:</strong> Click the "Activate Order" button to simulate order activation.</p>
            <p>3. <strong>GitHub Invitation:</strong> After activation, the GitHub invitation modal will automatically appear.</p>
            <p>4. <strong>Manual Invitation:</strong> For activated orders, you can manually trigger the GitHub invitation modal.</p>
            <p>5. <strong>Real Testing:</strong> Sign in and visit the <a href="/dashboard/billing" className="text-blue-600 hover:underline">billing dashboard</a> to test with real orders.</p>
          </CardContent>
        </Card>

        {/* GitHub Invite Modal */}
        {selectedOrder && (
          <GitHubInviteModal
            isOpen={githubModalOpen}
            onClose={handleCloseGithubModal}
            orderNo={selectedOrder.orderNo}
            productName={selectedOrder.productName}
          />
        )}
      </div>
    </div>
  );
}
