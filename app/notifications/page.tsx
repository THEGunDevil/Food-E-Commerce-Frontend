// app/notifications/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  Gift,
  Package,
  ShoppingCart,
  Star,
  Trash2,
  CheckCheck,
  Filter,
  Search,
  X,
  ChefHat,
  Users,
  AlertCircle,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system' | 'review' | 'payment';
  time: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  action?: string;
  orderId?: string;
  amount?: number;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #ORD-7894 for ৳1,250 placed by Rahim Khan',
      type: 'order',
      time: '5 minutes ago',
      isRead: false,
      priority: 'high',
      icon: <ShoppingCart className="h-5 w-5" />,
      action: 'View Order',
      orderId: '#ORD-7894',
      amount: 1250
    },
    {
      id: '2',
      title: 'Order On The Way',
      message: 'Order #ORD-7893 is out for delivery to Gulshan',
      type: 'order',
      time: '15 minutes ago',
      isRead: false,
      priority: 'medium',
      icon: <Truck className="h-5 w-5" />,
      action: 'Track Order',
      orderId: '#ORD-7893'
    },
    {
      id: '3',
      title: 'Payment Received',
      message: 'Payment of ৳850 received for order #ORD-7892 via bKash',
      type: 'payment',
      time: '1 hour ago',
      isRead: true,
      priority: 'medium',
      icon: <DollarSign className="h-5 w-5" />,
      amount: 850
    },
    {
      id: '4',
      title: 'New Customer Review',
      message: 'Fatima Begum rated your restaurant 5 stars',
      type: 'review',
      time: '2 hours ago',
      isRead: true,
      priority: 'low',
      icon: <Star className="h-5 w-5" />,
      action: 'View Review'
    },
    {
      id: '5',
      title: 'Special Offer',
      message: '20% off on all Biriyani items this Friday!',
      type: 'promotion',
      time: '5 hours ago',
      isRead: true,
      priority: 'medium',
      icon: <Gift className="h-5 w-5" />,
      action: 'View Offer'
    },
    {
      id: '6',
      title: 'Kitchen Alert',
      message: 'Low stock alert: Chicken inventory below minimum level',
      type: 'system',
      time: '1 day ago',
      isRead: true,
      priority: 'high',
      icon: <ChefHat className="h-5 w-5" />,
      action: 'Restock'
    },
    {
      id: '7',
      title: 'New Customer Registered',
      message: 'Karim Ahmed signed up as a new customer',
      type: 'system',
      time: '2 days ago',
      isRead: true,
      priority: 'low',
      icon: <Users className="h-5 w-5" />,
      action: 'View Profile'
    },
    {
      id: '8',
      title: 'Order Delayed',
      message: 'Order #ORD-7891 delivery delayed by 30 minutes',
      type: 'order',
      time: '3 days ago',
      isRead: true,
      priority: 'medium',
      icon: <Clock className="h-5 w-5" />,
      orderId: '#ORD-7891'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const orderNotifications = notifications.filter(n => n.type === 'order');
  const promotionNotifications = notifications.filter(n => n.type === 'promotion');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4" />;
      case 'promotion': return <Gift className="h-4 w-4" />;
      case 'system': return <AlertCircle className="h-4 w-4" />;
      case 'review': return <Star className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || notification.type === activeTab;
    const matchesUnread = !showUnreadOnly || !notification.isRead;
    
    return matchesSearch && matchesTab && matchesUnread;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with order alerts and promotions
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-2">
            <Bell className="h-3 w-3" />
            {unreadCount} unread
          </Badge>
          <Button
            onClick={handleMarkAllAsRead}
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={unreadCount === 0}
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Filters & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Notification Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Unread</span>
                  <Badge variant="destructive">{unreadCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Orders</span>
                  <Badge variant="outline">{orderNotifications.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Promotions</span>
                  <Badge variant="outline">{promotionNotifications.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search notifications..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="unread-only" className="text-sm cursor-pointer">
                    Show unread only
                  </label>
                  <Switch
                    id="unread-only"
                    checked={showUnreadOnly}
                    onCheckedChange={setShowUnreadOnly}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Quick Actions</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <CheckCheck className="h-4 w-4" />
                    Mark all as read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                    onClick={handleClearAll}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear all
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Order Notifications</p>
                    <p className="text-xs text-muted-foreground">New orders, updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Promotions</p>
                    <p className="text-xs text-muted-foreground">Offers & discounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Reviews</p>
                    <p className="text-xs text-muted-foreground">Customer feedback</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Notifications List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>All Notifications</CardTitle>
                  <CardDescription>
                    {filteredNotifications.length} notifications found
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                    <TabsList className="grid grid-cols-5 w-full sm:w-auto">
                      <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                      <TabsTrigger value="order" className="text-xs">Orders</TabsTrigger>
                      <TabsTrigger value="promotion" className="text-xs">Promo</TabsTrigger>
                      <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
                      <TabsTrigger value="payment" className="text-xs">Payment</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || showUnreadOnly || activeTab !== 'all'
                      ? 'Try changing your filters'
                      : 'All caught up! You have no new notifications'}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab('all');
                      setShowUnreadOnly(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                          notification.isRead
                            ? 'bg-white border-gray-200'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex gap-4">
                          {/* Icon */}
                          <div className={`p-2 rounded-lg ${
                            notification.isRead ? 'bg-gray-100' : 'bg-blue-100'
                          }`}>
                            <div className={notification.isRead ? 'text-gray-600' : 'text-blue-600'}>
                              {notification.icon}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <h4 className={`font-semibold ${
                                  notification.isRead ? 'text-gray-900' : 'text-gray-900'
                                }`}>
                                  {notification.title}
                                </h4>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getPriorityColor(notification.priority)}`}
                                >
                                  {notification.priority}
                                </Badge>
                                {!notification.isRead && (
                                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {notification.time}
                                </span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleMarkAsRead(notification.id)}
                                      disabled={notification.isRead}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as read
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteNotification(notification.id)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">
                              {notification.message}
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                              {notification.orderId && (
                                <Badge variant="secondary" className="gap-1">
                                  <Package className="h-3 w-3" />
                                  {notification.orderId}
                                </Badge>
                              )}
                              
                              {notification.amount && (
                                <Badge variant="outline" className="gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  {formatCurrency(notification.amount)}
                                </Badge>
                              )}
                              
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {getTypeIcon(notification.type)}
                                <span className="capitalize">{notification.type}</span>
                              </div>
                              
                              {notification.action && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs ml-auto"
                                >
                                  {notification.action}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Mobile Stats (Hidden on desktop) */}
          <div className="lg:hidden mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-700">{unreadCount}</p>
                    <p className="text-xs text-blue-600">Unread</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-700">
                      {orderNotifications.length}
                    </p>
                    <p className="text-xs text-green-600">Orders</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-700">
                      {promotionNotifications.length}
                    </p>
                    <p className="text-xs text-purple-600">Promotions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}