'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChefHat,
  MoreVertical,
  Filter,
  Search,

} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Order {
  id: string;
  customer: string;
  amount: number;
  items: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  time: string;
  deliveryType: 'pickup' | 'delivery';
  payment: 'cod' | 'bkash' | 'card';
  itemsList?: string[];
}

const initialOrders: Order[] = [
  { id: '#ORD-2456', customer: 'Rahim Khan', amount: 1250, items: 4, status: 'delivered', time: '10:30 AM', deliveryType: 'delivery', payment: 'cod', itemsList: ['Kacchi Biryani', 'Borhani', 'Firni'] },
  { id: '#ORD-2455', customer: 'Fatima Begum', amount: 850, items: 2, status: 'preparing', time: '10:15 AM', deliveryType: 'pickup', payment: 'bkash', itemsList: ['Chicken Roast', 'Paratha'] },
  { id: '#ORD-2454', customer: 'Karim Ahmed', amount: 1500, items: 5, status: 'ready', time: '9:45 AM', deliveryType: 'delivery', payment: 'cod', itemsList: ['Beef Tehari', 'Chicken Curry', 'Salad'] },
  { id: '#ORD-2453', customer: 'Sadia Rahman', amount: 620, items: 3, status: 'pending', time: '9:30 AM', deliveryType: 'delivery', payment: 'bkash', itemsList: ['Vegetable Curry', 'Rice'] },
  { id: '#ORD-2452', customer: 'Mizanur Rahman', amount: 2100, items: 6, status: 'delivered', time: '9:00 AM', deliveryType: 'pickup', payment: 'card', itemsList: ['Mutton Biryani', 'Korma', 'Raita'] },
  { id: '#ORD-2451', customer: 'Tahmina Akter', amount: 980, items: 3, status: 'cancelled', time: '8:45 AM', deliveryType: 'delivery', payment: 'cod', itemsList: ['Fish Curry', 'Dal'] },
  { id: '#ORD-2450', customer: 'Shahriar Ahmed', amount: 1750, items: 4, status: 'preparing', time: '8:30 AM', deliveryType: 'delivery', payment: 'bkash', itemsList: ['Special Biryani', 'Kebab'] },
  { id: '#ORD-2449', customer: 'Nusrat Jahan', amount: 540, items: 2, status: 'ready', time: '8:15 AM', deliveryType: 'pickup', payment: 'cod', itemsList: ['Soup', 'Bread'] },
];

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deliveryFilter, setDeliveryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: 'Pending', icon: Clock, className: 'bg-amber-100 text-amber-800 hover:bg-amber-100' },
      preparing: { label: 'Preparing', icon: ChefHat, className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      ready: { label: 'Ready', icon: Package, className: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-100' },
      delivered: { label: 'Delivered', icon: CheckCircle, className: 'bg-green-100 text-green-800 hover:bg-green-100' },
      cancelled: { label: 'Cancelled', icon: XCircle, className: 'bg-red-100 text-red-800 hover:bg-red-100' },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant="secondary" className={`gap-1 ${config.className}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentIcon = (payment: Order['payment']) => {
    const icons = {
      cod: '💵',
      bkash: '📱',
      card: '💳',
    };
    return icons[payment];
  };

  const getDeliveryIcon = (type: Order['deliveryType']) => {
    return type === 'delivery' ? <Truck className="h-3 w-3" /> : <Package className="h-3 w-3" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDelivery = deliveryFilter === 'all' || order.deliveryType === deliveryFilter;
    
    return matchesSearch && matchesStatus && matchesDelivery;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(`2024-01-01 ${b.time}`).getTime() - new Date(`2024-01-01 ${a.time}`).getTime();
    } else if (sortBy === 'amount-high') {
      return b.amount - a.amount;
    } else if (sortBy === 'amount-low') {
      return a.amount - b.amount;
    }
    return 0;
  });

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      handleStatusUpdate(orderId, 'cancelled');
    }
  };

  const getCustomerInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Stats
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Recent Orders
            </CardTitle>
            <CardDescription>
              Manage and track customer orders
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <Button size="sm" className="gap-2">
              <span className="hidden sm:inline">New Order</span>
              <span className="sm:hidden">+</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-blue-50 p-2 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-700">{orders.length}</p>
            <p className="text-xs text-blue-600">Total Orders</p>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg text-center">
            <p className="text-2xl font-bold text-amber-700">{pendingOrders}</p>
            <p className="text-xs text-amber-600">Pending</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-700">{formatCurrency(totalRevenue)}</p>
            <p className="text-xs text-green-600">Revenue</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Filters & Search */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by order ID or customer..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Delivery Type</label>
              <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="delivery">Home Delivery</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Orders Table - Desktop */}
        <div className="hidden lg:block">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map((order) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getDeliveryIcon(order.deliveryType)}
                        {order.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getCustomerInitials(order.customer)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.items} items • {getPaymentIcon(order.payment)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {order.time}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleCancelOrder(order.id)}
                          >
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
        </div>

        {/* Orders Cards - Mobile */}
        <div className="lg:hidden space-y-3">
          {sortedOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {getCustomerInitials(order.customer)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{order.customer}</h4>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {order.id}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.items} items • {order.time}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-lg font-bold">{formatCurrency(order.amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(order.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Delivery</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getDeliveryIcon(order.deliveryType)}
                    <span className="text-sm">
                      {order.deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span>{getPaymentIcon(order.payment)}</span>
                    <span className="text-sm">
                      {order.payment === 'cod' ? 'Cash' : 
                       order.payment === 'bkash' ? 'bKash' : 'Card'}
                    </span>
                  </div>
                </div>
              </div>

              {order.itemsList && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Items</p>
                  <div className="flex flex-wrap gap-1">
                    {order.itemsList.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                    {order.itemsList.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{order.itemsList.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Update
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary & Empty State */}
        {sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search term
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDeliveryFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {sortedOrders.length} of {orders.length} orders
            </div>
            <div className="text-sm">
              <span className="font-medium">{formatCurrency(totalRevenue)}</span>
              {' '}total revenue •{' '}
              <span className="font-medium">{formatCurrency(avgOrderValue)}</span>
              {' '}avg. order
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}