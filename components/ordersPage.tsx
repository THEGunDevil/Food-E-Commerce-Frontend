// app/dashboard/orders/page.tsx
'use client';

import React, { useState } from 'react';
import { Package, Search, Filter, Clock, CheckCircle, XCircle, Truck, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import OrderDetails from './orderDetails';

const orders = [
  { id: '#ORD-2456', customer: 'Rahim Khan', amount: '৳1,250', items: 4, status: 'delivered', time: '10:30 AM' },
  { id: '#ORD-2455', customer: 'Fatima Begum', amount: '৳850', items: 2, status: 'preparing', time: '10:15 AM' },
  { id: '#ORD-2454', customer: 'Karim Ahmed', amount: '৳1,500', items: 5, status: 'onway', time: '9:45 AM' },
  { id: '#ORD-2453', customer: 'Sadia Rahman', amount: '৳620', items: 3, status: 'pending', time: '9:30 AM' },
  { id: '#ORD-2452', customer: 'Mizanur Rahman', amount: '৳2,100', items: 6, status: 'delivered', time: '9:00 AM' },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 gap-1"><CheckCircle className="h-3 w-3" /> Delivered</Badge>;
      case 'preparing':
        return <Badge className="bg-blue-100 text-blue-800 gap-1"><Clock className="h-3 w-3" /> Preparing</Badge>;
      case 'onway':
        return <Badge className="bg-purple-100 text-purple-800 gap-1"><Truck className="h-3 w-3" /> On the way</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  if (selectedOrder) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setSelectedOrder(null)} className="mb-4">
            ← Back to Orders
          </Button>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-muted-foreground">Order #{selectedOrder.id}</p>
        </div>
        <OrderDetails order={selectedOrder} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">View and manage customer orders</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Tabs and Search */}
      <Tabs defaultValue="all" className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <OrdersTable 
            orders={filteredOrders} 
            getStatusBadge={getStatusBadge}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Separate Orders Table Component
const OrdersTable = ({ orders, getStatusBadge, onViewDetails }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Orders ({orders.length})</CardTitle>
      <CardDescription>All orders from customers</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items} items</TableCell>
                <TableCell className="font-bold">{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(order)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);