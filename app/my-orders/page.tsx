// app/orders/page.tsx
'use client';

import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, ArrowRight, Filter, Search, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const orders = [
  {
    id: 'ORD-001',
    restaurant: 'Star Kabab',
    date: '2024-02-15',
    items: ['Kacchi Biryani', 'Borhani', 'Salad'],
    total: 520,
    status: 'delivered',
    deliveryTime: '30-40 mins',
    rating: 4.8,
    orderType: 'Delivery'
  },
  {
    id: 'ORD-002',
    restaurant: 'Sultan\'s Dine',
    date: '2024-02-14',
    items: ['Beef Rezala', 'Plain Rice', 'Rosogolla'],
    total: 450,
    status: 'on-the-way',
    deliveryTime: '25-35 mins',
    eta: '10 mins',
    orderType: 'Delivery'
  },
  {
    id: 'ORD-003',
    restaurant: 'Panshi Restaurant',
    date: '2024-02-13',
    items: ['Ilish Bhapa', 'Ruti', 'Daal'],
    total: 620,
    status: 'preparing',
    deliveryTime: '20-30 mins',
    orderType: 'Pickup'
  },
  {
    id: 'ORD-004',
    restaurant: 'Bamboo Garden',
    date: '2024-02-12',
    items: ['Thai Green Curry', 'Fried Rice'],
    total: 380,
    status: 'cancelled',
    orderType: 'Delivery'
  },
  {
    id: 'ORD-005',
    restaurant: 'Misti Hub',
    date: '2024-02-11',
    items: ['Mishti Doi', 'Gulab Jamun', 'Firni'],
    total: 240,
    status: 'delivered',
    rating: 4.5,
    orderType: 'Delivery'
  },
];

const orderStatus = [
  { value: 'all', label: 'All Orders' },
  { value: 'preparing', label: 'Preparing', icon: '⏳' },
  { value: 'on-the-way', label: 'On the Way', icon: '🚚' },
  { value: 'delivered', label: 'Delivered', icon: '✅' },
  { value: 'cancelled', label: 'Cancelled', icon: '❌' },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Preparing</Badge>;
      case 'on-the-way':
        return <Badge variant="default" className="gap-1"><Truck className="h-3 w-3" />On the Way</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="gap-1 bg-green-50 text-green-800 border-green-200"><CheckCircle className="h-3 w-3" />Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (searchQuery && !order.restaurant.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeOrders = orders.filter(order => ['preparing', 'on-the-way'].includes(order.status));

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your food orders</p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Active Orders ({activeOrders.length})</h3>
                    <p className="text-sm text-blue-700">Your food is on the way!</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  Track All
                </Button>
              </div>
              <Progress value={60} className="mt-4" />
              <div className="flex justify-between text-sm mt-2">
                <span>Order placed</span>
                <span>Preparing</span>
                <span className="font-semibold">On the way</span>
                <span>Delivered</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full sm:w-auto">
              {orderStatus.map((status) => (
                <TabsTrigger key={status.value} value={status.value} className="gap-1">
                  {status.icon && <span>{status.icon}</span>}
                  <span className="hidden sm:inline">{status.label}</span>
                  <span className="sm:hidden">{status.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Tabs>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet</p>
            <Button>Browse Restaurants</Button>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>{order.restaurant} • {order.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <Badge variant="outline">{order.orderType}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Items:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm">Delivery Time</p>
                      <p className="font-medium">{order.deliveryTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Total Amount</p>
                      <p className="text-2xl font-bold">৳{order.total}</p>
                    </div>
                  </div>
                  
                  {order.eta && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Your order will arrive in {order.eta}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-2 pt-3">
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
                {order.status === 'delivered' && (
                  <Button className="flex-1" variant="secondary">
                    Reorder
                  </Button>
                )}
                {order.status === 'delivered' && !order.rating && (
                  <Button className="flex-1">
                    Rate Order
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}