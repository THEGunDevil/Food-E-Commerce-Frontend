// components/orders/OrderDetails.tsx
'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  CreditCard, 
  MessageSquare, 
  Printer, 
  Download, 
  Truck, 
  CheckCircle, 
  XCircle, 
  ChefHat,
  Timer,
  Package,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface OrderDetailsProps {
  order: any;
  onBack?: () => void;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
  image?: string;
}

interface OrderStatus {
  status: string;
  timestamp: string;
  message: string;
}

export default function OrderDetails({ order, onBack }: OrderDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [orderStatus, setOrderStatus] = useState(order?.status || 'pending');
  const [chefNotes, setChefNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock order data - replace with your actual data structure
  const orderDetails = {
    ...order,
    orderDate: '15 Dec 2024, 10:30 AM',
    deliveryType: 'Home Delivery',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    deliveryAddress: '123 Gulshan Avenue, Gulshan-1, Dhaka 1212',
    customerPhone: '+880 1712 345678',
    customerEmail: 'customer@example.com',
    estimatedDelivery: '11:30 AM',
    deliveryPerson: 'Delivery Hero (ID: DH-456)',
    deliveryPhone: '+880 1719 876543',
    specialInstructions: 'Please add extra green chili and avoid onion in biryani',
    discount: '৳150',
    deliveryCharge: '৳60',
    vat: '৳75',
    subtotal: '৳1,400',
    total: '৳1,250',
    items: [
      { id: '1', name: 'Kacchi Biryani (Mutton)', quantity: 2, price: 450, specialInstructions: 'Extra gravy', image: '/api/placeholder/400/300' },
      { id: '2', name: 'Chicken Roast', quantity: 1, price: 280, image: '/api/placeholder/400/300' },
      { id: '3', name: 'Borhani', quantity: 1, price: 120, image: '/api/placeholder/400/300' },
      { id: '4', name: 'Firni', quantity: 1, price: 80, image: '/api/placeholder/400/300' },
    ] as OrderItem[],
    statusHistory: [
      { status: 'Order Placed', timestamp: '10:15 AM', message: 'Order received from customer' },
      { status: 'Order Confirmed', timestamp: '10:20 AM', message: 'Order confirmed by restaurant' },
      { status: 'Food Preparing', timestamp: '10:25 AM', message: 'Chef started preparing the order' },
      { status: 'Ready for Delivery', timestamp: '11:15 AM', message: 'Order is packed and ready' },
      { status: 'Out for Delivery', timestamp: '11:20 AM', message: 'Delivery person picked up the order' },
    ] as OrderStatus[],
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-amber-500' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-500' },
    { value: 'preparing', label: 'Preparing', color: 'bg-indigo-500' },
    { value: 'ready', label: 'Ready', color: 'bg-cyan-500' },
    { value: 'onway', label: 'On the Way', color: 'bg-purple-500' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-500' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
  ];

  const getStatusProgress = (status: string) => {
    const statusIndex = statusOptions.findIndex(s => s.value === status);
    return ((statusIndex + 1) / statusOptions.length) * 100;
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrderStatus(newStatus);
      
      toast({
        title: "Status Updated",
        description: `Order status changed to ${statusOptions.find(s => s.value === newStatus)?.label}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
    toast({
      title: "Print Started",
      description: "Invoice sent to printer",
    });
  };

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: "Customer has been notified about order status",
    });
  };

  const handleCallCustomer = () => {
    toast({
      title: "Calling Customer",
      description: `Opening phone app for ${orderDetails.customerPhone}`,
    });
    // In real app, this would trigger phone call
  };

  const handleCancelOrder = async () => {
    try {
      await handleStatusUpdate('cancelled');
      toast({
        title: "Order Cancelled",
        description: "Order has been cancelled successfully",
        variant: "destructive",
      });
    } catch (error) {
      // Error handled in status update
    }
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    const estimated = new Date();
    estimated.setHours(11, 30, 0);
    const diff = estimated.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes <= 0) return 'Overdue';
    return `${minutes} minutes`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="sm:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Order #{orderDetails.id}
              <Badge variant={orderStatus === 'cancelled' ? 'destructive' : 'outline'}>
                {statusOptions.find(s => s.value === orderStatus)?.label}
              </Badge>
            </h1>
            <p className="text-muted-foreground">
              Placed on {orderDetails.orderDate}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack} className="hidden sm:flex gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
          
          <Button variant="outline" size="icon" onClick={handlePrintInvoice}>
            <Printer className="h-4 w-4" />
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <XCircle className="h-4 w-4" />
                Cancel Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Order #{orderDetails.id}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently cancel the order and notify the customer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleCancelOrder}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Yes, Cancel Order
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Status Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">Order Progress</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Timer className="h-4 w-4" />
                <span>Est. delivery: {orderDetails.estimatedDelivery}</span>
              </div>
            </div>
            
            <Progress value={getStatusProgress(orderStatus)} className="h-2" />
            
            <div className="flex justify-between relative pt-2">
              {statusOptions.slice(0, 5).map((status, index) => (
                <div key={status.value} className="flex flex-col items-center">
                  <div className={`h-3 w-3 rounded-full ${status.color} ${orderStatus === status.value ? 'ring-4 ring-offset-2 ring-opacity-50' : ''}`} />
                  <span className="text-xs mt-1 text-center">{status.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items & Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="details">Order Details</TabsTrigger>
              <TabsTrigger value="items">Items ({orderDetails.items.length})</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>Customer</span>
                      </div>
                      <p className="font-medium">{orderDetails.customer}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{orderDetails.customerPhone}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleCallCustomer}
                          className="h-8 w-8 p-0"
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        <span>Payment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{orderDetails.paymentMethod}</p>
                        <Badge variant={orderDetails.paymentStatus === 'Paid' ? 'default' : 'secondary'}>
                          {orderDetails.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Truck className="h-4 w-4" />
                        <span>Delivery Type</span>
                      </div>
                      <p className="font-medium">{orderDetails.deliveryType}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Delivery Address</span>
                    </div>
                    <p className="font-medium">{orderDetails.deliveryAddress}</p>
                  </div>
                  
                  {orderDetails.specialInstructions && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>Special Instructions</span>
                      </div>
                      <p className="text-sm p-3 bg-amber-50 border border-amber-200 rounded-md">
                        {orderDetails.specialInstructions}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="items" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-3 border rounded-lg">
                          <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <ChefHat className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-bold">৳{item.price * item.quantity}</p>
                            </div>
                            <p className="text-sm">৳{item.price} each</p>
                            {item.specialInstructions && (
                              <p className="text-sm text-amber-600 mt-1">
                                Note: {item.specialInstructions}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetails.statusHistory.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`h-3 w-3 rounded-full ${index < 3 ? 'bg-green-500' : 'bg-gray-300'}`} />
                          {index < orderDetails.statusHistory.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-1" />
                          )}
                        </div>
                        <div className="pb-4 flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{event.status}</h4>
                            <span className="text-sm text-muted-foreground">{event.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{event.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Summary & Actions */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">৳{orderDetails.subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-medium text-green-600">-৳{orderDetails.discount}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span className="font-medium">৳{orderDetails.deliveryCharge}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (5%)</span>
                <span className="font-medium">৳{orderDetails.vat}</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>৳{orderDetails.total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select
                  value={orderStatus}
                  onValueChange={handleStatusUpdate}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${status.color}`} />
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chefNotes">Chef Notes</Label>
                <Textarea
                  id="chefNotes"
                  placeholder="Add notes for the kitchen staff..."
                  value={chefNotes}
                  onChange={(e) => setChefNotes(e.target.value)}
                  rows={3}
                />
              </div>
              
              <Button 
                onClick={handleSendNotification}
                variant="outline"
                className="w-full gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Notify Customer
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Invoice
                </Button>
                <Button onClick={handlePrintInvoice} className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          {orderDetails.deliveryType === 'Home Delivery' && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>DH</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{orderDetails.deliveryPerson}</p>
                    <p className="text-sm text-muted-foreground">{orderDetails.deliveryPhone}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Delivery</span>
                    <span className="font-medium">{orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time Remaining</span>
                    <span className={`font-medium ${calculateTimeRemaining() === 'Overdue' ? 'text-red-600' : ''}`}>
                      {calculateTimeRemaining()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Label component for consistency
const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {children}
  </label>
);