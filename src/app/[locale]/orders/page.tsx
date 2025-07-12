"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Loader2, CreditCard, Calendar, Package } from "lucide-react";

interface Order {
  id: number;
  orderNo: string;
  amount: number;
  status: string;
  createdAt: string;
  productName: string;
  currency: string;
  paidAt: string | null;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activatingOrders, setActivatingOrders] = useState<Set<string>>(new Set());
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchOrders();
    }
  }, [session]);

  const handleActivateOrder = async (orderNo: string) => {
    setActivatingOrders(prev => new Set(prev).add(orderNo));
    
    try {
      const response = await fetch("/api/orders/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderNo }),
      });

      if (!response.ok) {
        throw new Error("Failed to activate order");
      }

      // Refresh orders after activation
      const ordersResponse = await fetch("/api/orders");
      if (ordersResponse.ok) {
        const data = await ordersResponse.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error activating order:", error);
    } finally {
      setActivatingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderNo);
        return newSet;
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Failed</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
          <Button onClick={() => window.location.href = '/auth/signin'}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          View and manage your purchase history
        </p>
      </div>

      {orders.length === 0 ? (
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-4">
            You haven't made any purchases yet. Browse our pricing plans to get started.
          </p>
          <Button onClick={() => window.location.href = '/#pricing'}>
            View Pricing
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{order.productName}</h3>
                  <p className="text-sm text-muted-foreground">Order #{order.orderNo}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    ${order.amount} {order.currency.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>

                {order.paidAt && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Paid on {format(new Date(order.paidAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}
              </div>

              {order.status === 'paid' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleActivateOrder(order.orderNo)}
                    disabled={activatingOrders.has(order.orderNo)}
                    size="sm"
                  >
                    {activatingOrders.has(order.orderNo) ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Activating...
                      </>
                    ) : (
                      'Activate Access'
                    )}
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
